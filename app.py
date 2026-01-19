"""
Neighborly Backend API - Minimal Working Version
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Neighborly API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
DATABASE_URL = os.getenv('DATABASE_URL')
DB_NAME = os.getenv('MONGODB_DB_NAME', 'neighborly')

class Database:
    client = None
    db = None
    
    @classmethod
    def connect(cls):
        if cls.client is None:
            try:
                cls.client = MongoClient(DATABASE_URL, server_api=ServerApi('1'))
                cls.client.admin.command('ping')
                cls.db = cls.client[DB_NAME]
                print(f"✅ Connected to MongoDB: {DB_NAME}")
            except Exception as e:
                print(f"❌ MongoDB connection failed: {e}")
                raise
    
    @classmethod
    def get_db(cls):
        if cls.db is None:
            cls.connect()
        return cls.db

# Connect on startup
@app.on_event("startup")
async def startup_event():
    Database.connect()

# Models
class WaitlistEntry(BaseModel):
    email: EmailStr
    name: str
    city: str
    zipCode: str

# Routes
@app.get("/")
async def root():
    return {"message": "Neighborly API", "status": "running"}

@app.get("/api/health")
async def health_check():
    try:
        db = Database.get_db()
        db.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@app.post("/api/waitlist")
async def join_waitlist(entry: WaitlistEntry):
    try:
        db = Database.get_db()
        waitlist = db['waitlist']
        
        existing = waitlist.find_one({"email": entry.email})
        if existing:
            position = waitlist.count_documents({"createdAt": {"$lte": existing.get("createdAt")}})
            return {
                "success": True,
                "message": "You're already on the waitlist!",
                "position": position
            }
        
        entry_dict = entry.dict()
        entry_dict['createdAt'] = datetime.utcnow()
        result = waitlist.insert_one(entry_dict)
        position = waitlist.count_documents({})
        
        return {
            "success": True,
            "message": "Successfully joined the waitlist!",
            "position": position
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/tools")
async def get_tools():
    try:
        db = Database.get_db()
        tools = list(db['tools'].find({}))
        for tool in tools:
            tool['id'] = str(tool.pop('_id'))
        return {"tools": tools, "totalCount": len(tools)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)