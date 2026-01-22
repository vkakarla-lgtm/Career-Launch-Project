import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  Alert, 
  Image, 
  Platform, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  ScrollView 
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { app, storage } from '../../firebaseConfig';

interface Category {
  type: string;
}

interface FormValues {
  label: string;
  desc: string;
  category: string;
  price: string;
  image: string;
}

export default function Post() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const db = getFirestore(app);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Get Category List from Firestore
  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));
      const categories: Category[] = [];
      
      querySnapshot.forEach((doc) => {
        categories.push(doc.data() as Category);
      });
      
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      Alert.alert("Error", "Failed to load categories");
    }
  };

  // Pick Image from Gallery
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Date/Time Change Handler
  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Submit Form
  const onSubmitMethod = async (values: FormValues) => {
    if (!image) {
      Alert.alert("Image Required", "Please upload an image of your tool");
      return;
    }

    setLoading(true);

    try {
      // Convert URI to Blob
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, 'communityPost/' + Date.now() + ".jpg");

      // Upload to Firebase Storage
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      // Add to Firestore
      const docData = {
        ...values,
        image: downloadUrl,
        createdAt: new Date(),
        availableUntil: date,
      };

      const docRef = await addDoc(collection(db, "UserPost"), docData);

      if (docRef.id) {
        setLoading(false);
        Alert.alert('Success!', 'Your tool listing has been posted.');
        // Reset form would go here
      }
    } catch (error) {
      setLoading(false);
      console.error("Error posting listing:", error);
      Alert.alert("Error", "Failed to post listing. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Post a New Listing</Text>

        <Formik
          initialValues={{ label: '', desc: '', category: '', price: '', image: '' }}
          onSubmit={(values) => onSubmitMethod(values)}
          validate={(values) => {
            const errors: any = {};
            if (!values.label) {
              errors.label = "Tool name is required";
            }
            if (!values.price) {
              errors.price = "Price is required";
            }
            if (!values.category) {
              errors.category = "Category is required";
            }
            return errors;
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue, resetForm, values }) => (
            <View>
              {/* Image Picker */}
              <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>📷</Text>
                    <Text style={styles.imagePlaceholderSubtext}>Tap to add photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Tool Name */}
              <TextInput
                style={styles.input}
                placeholder='Tool Name (e.g., Power Drill)'
                placeholderTextColor='#a8a8a8'
                value={values.label}
                onChangeText={handleChange('label')}
              />

              {/* Description */}
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder='Description (condition, included accessories, etc.)'
                placeholderTextColor='#a8a8a8'
                value={values.desc}
                multiline
                numberOfLines={5}
                onChangeText={handleChange('desc')}
              />

              {/* Price */}
              <TextInput
                style={styles.input}
                placeholder='Price per day ($)'
                placeholderTextColor='#a8a8a8'
                value={values.price}
                keyboardType='number-pad'
                onChangeText={handleChange('price')}
              />

              {/* Category Dropdown */}
              <View style={styles.dropdown}>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select a Category',
                    value: "",
                    color: '#9EA0A4',
                  }}
                  items={categoryList.map(item => ({
                    label: item.type,
                    value: item.type,
                    color: '#000',
                  }))}
                  value={values.category}
                  onValueChange={(value) => setFieldValue('category', value)}
                  style={{
                    inputIOSContainer: {
                      width: '100%',
                      height: 50,
                      borderRadius: 10,
                      padding: 10,
                    }
                  }}
                />
              </View>

              {/* Date/Time Picker */}
              <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Available Until:</Text>
                <View style={styles.datePickerRow}>
                  <RNDateTimePicker
                    style={styles.datePicker}
                    value={date}
                    mode='date'
                    onChange={onChangeDate}
                  />
                  <RNDateTimePicker
                    style={styles.datePicker}
                    value={date}
                    mode='time'
                    onChange={onChangeDate}
                  />
                </View>
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={() => {
                    resetForm();
                    setImage(null);
                    setDate(new Date());
                  }}
                  style={[styles.button, styles.cancelButton]}
                  disabled={loading}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={[styles.button, styles.postButton, loading && styles.buttonDisabled]}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : (
                    <Text style={styles.postButtonText}>Post Listing</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2B2B2B',
    textAlign: 'center',
    marginBottom: 30,
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D0D0D0',
    borderStyle: 'dashed',
  },
  imagePlaceholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#2B2B2B',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    overflow: 'hidden',
  },
  dateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dateLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 12,
    fontWeight: '600',
  },
  datePickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  datePicker: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  cancelButtonText: {
    color: '#2B2B2B',
    fontSize: 16,
    fontWeight: '700',
  },
  postButton: {
    backgroundColor: '#FF6B55',
    shadowColor: '#FF6B55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
});