import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface Tool {
  id: number;
  name: string;
  icon: string;
  price: number;
  owner: string;
  distance: number;
  rating: number;
  reviews: number;
  description: string;
  available: boolean;
}

const tools: Tool[] = [
  {
    id: 1,
    name: 'Power Drill',
    icon: '🔧',
    price: 8,
    owner: 'Sarah M.',
    distance: 0.3,
    rating: 5,
    reviews: 47,
    description: 'DeWalt 20V cordless drill with two batteries and charger. Perfect for hanging pictures, furniture assembly, or small projects.',
    available: true
  },
  {
    id: 2,
    name: 'Lawn Mower',
    icon: '🌿',
    price: 15,
    owner: 'Mike R.',
    distance: 0.5,
    rating: 5,
    reviews: 32,
    description: 'Honda self-propelled lawn mower. Well-maintained, starts on first pull. Great for yards up to 1/2 acre.',
    available: true
  },
  {
    id: 3,
    name: 'Extension Ladder',
    icon: '🪜',
    price: 12,
    owner: 'David L.',
    distance: 0.7,
    rating: 5,
    reviews: 28,
    description: '24-foot Werner extension ladder. Perfect for gutter cleaning, painting, or roof access. Includes stabilizer.',
    available: true
  },
  {
    id: 4,
    name: 'Pressure Washer',
    icon: '💦',
    price: 20,
    owner: 'Jessica T.',
    distance: 0.4,
    rating: 5,
    reviews: 41,
    description: 'Gas-powered pressure washer. 3000 PSI. Includes multiple nozzles. Great for decks, driveways, and siding.',
    available: false
  },
  {
    id: 5,
    name: 'Circular Saw',
    icon: '⚙️',
    price: 10,
    owner: 'Robert K.',
    distance: 0.6,
    rating: 4,
    reviews: 19,
    description: 'Makita 7.25" circular saw. Sharp blade, powerful motor. Ideal for cutting lumber, plywood, or framing.',
    available: true
  },
  {
    id: 6,
    name: 'Leaf Blower',
    icon: '🍂',
    price: 8,
    owner: 'Amanda W.',
    distance: 0.3,
    rating: 5,
    reviews: 35,
    description: 'Gas-powered leaf blower. Strong airflow, easy to start. Perfect for clearing leaves, grass clippings, or debris.',
    available: true
  }
];

export default function HomeScreen() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <Text style={styles.logo}>🏠 Neighborly</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Waitlist</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Hero Section */}
      <ThemedView style={styles.hero}>
        <Text style={styles.heroEmoji}>🔨</Text>
        <ThemedText type="title" style={styles.heroTitle}>
          Borrow Tools from Neighbors
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          The hyperlocal marketplace where your community shares power tools, lawn equipment, and everything in between.
        </ThemedText>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>$50B+</Text>
            <Text style={styles.statLabel}>MARKET SIZE</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>99%</Text>
            <Text style={styles.statLabel}>TIME UNUSED</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>VERIFIED</Text>
          </View>
        </View>
      </ThemedView>

      {/* Tools Near You */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>🔍 Tools Near You</ThemedText>
        
        {tools.map(tool => (
          <TouchableOpacity 
            key={tool.id} 
            style={styles.toolCard}
            onPress={() => setSelectedTool(tool)}
            activeOpacity={0.7}
          >
            <View style={styles.toolHeader}>
              <View style={styles.toolInfo}>
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <View style={styles.toolDetails}>
                  <Text style={styles.toolName}>{tool.name}</Text>
                  <Text style={styles.toolLocation}>📍 {tool.distance} miles • {tool.owner}</Text>
                  <Text style={styles.toolRating}>{'⭐'.repeat(tool.rating)} ({tool.reviews})</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${tool.price}</Text>
                <Text style={styles.priceLabel}>/day</Text>
              </View>
            </View>
            <View style={styles.availabilityContainer}>
              {tool.available ? (
                <View style={styles.availableBadge}>
                  <Text style={styles.availableText}>Available</Text>
                </View>
              ) : (
                <View style={styles.rentedBadge}>
                  <Text style={styles.rentedText}>Rented</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Problem Section */}
      <ThemedView style={styles.section}>
        <Text style={styles.sectionTag}>🧩 THE PROBLEM</Text>
        <ThemedText type="title" style={styles.sectionHeading}>
          Everyone Owns Tools.{'\n'}Nobody Uses Them.
        </ThemedText>

        <View style={styles.problemGrid}>
          <View style={styles.problemCard}>
            <Text style={styles.problemIcon}>💸</Text>
            <Text style={styles.problemTitle}>Wasted Money</Text>
            <Text style={styles.problemText}>
              Americans spend thousands on tools that collect dust in their garages.
            </Text>
          </View>

          <View style={styles.problemCard}>
            <Text style={styles.problemIcon}>📦</Text>
            <Text style={styles.problemTitle}>Wasted Space</Text>
            <Text style={styles.problemText}>
              Storage space is expensive. Why fill it with equipment you use once a year?
            </Text>
          </View>

          <View style={styles.problemCard}>
            <Text style={styles.problemIcon}>🚗</Text>
            <Text style={styles.problemTitle}>Inconvenient Rentals</Text>
            <Text style={styles.problemText}>
              Traditional rentals require driving across town and long lines.
            </Text>
          </View>
        </View>
      </ThemedView>

      {/* Solution Section */}
      <View style={styles.solutionSection}>
        <Text style={styles.solutionTag}>💡 THE SOLUTION</Text>
        <Text style={styles.solutionTitle}>Your Neighborhood{'\n'}is the New Hardware Store</Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔍</Text>
            <Text style={styles.featureText}>Search by ZIP code to find tools within blocks</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureText}>Book tools by hour or day with instant confirmation</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={styles.featureText}>Protected transactions with deposits and insurance</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⭐</Text>
            <Text style={styles.featureText}>Rate every rental to build community trust</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <ThemedView style={styles.ctaSection}>
        <ThemedText type="title" style={styles.ctaTitle}>Join the Beta</ThemedText>
        <Text style={styles.ctaText}>
          Launching in Austin, Denver, and Portland. Get early access and earn credits!
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Get Early Access →</Text>
        </TouchableOpacity>
      </ThemedView>

      {/* Tool Detail Modal */}
      <Modal
        visible={selectedTool !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedTool(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedTool(null)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {selectedTool && (
                <>
                  <Text style={styles.modalIcon}>{selectedTool.icon}</Text>
                  <Text style={styles.modalTitle}>{selectedTool.name}</Text>
                  <Text style={styles.modalLocation}>📍 {selectedTool.distance} miles away</Text>

                  <View style={styles.modalPriceCard}>
                    <View style={styles.modalPriceSection}>
                      <Text style={styles.modalPriceLabel}>Price</Text>
                      <Text style={styles.modalPrice}>${selectedTool.price}<Text style={styles.modalPriceUnit}>/day</Text></Text>
                    </View>
                    <View style={styles.modalRatingSection}>
                      <Text style={styles.modalStars}>{'⭐'.repeat(selectedTool.rating)}</Text>
                      <Text style={styles.modalReviews}>{selectedTool.reviews} reviews</Text>
                    </View>
                  </View>

                  <View style={styles.modalOwnerCard}>
                    <View style={styles.ownerAvatar}>
                      <Text style={styles.ownerInitial}>{selectedTool.owner.charAt(0)}</Text>
                    </View>
                    <View>
                      <Text style={styles.ownerName}>{selectedTool.owner}</Text>
                      <Text style={styles.ownerVerified}>Verified neighbor</Text>
                    </View>
                  </View>

                  <View style={styles.modalDescriptionCard}>
                    <Text style={styles.modalSectionTitle}>Description</Text>
                    <Text style={styles.modalDescription}>{selectedTool.description}</Text>
                  </View>

                  <View style={styles.modalProtectionCard}>
                    <Text style={styles.modalSectionTitle}>Protection</Text>
                    <View style={styles.protectionItem}>
                      <Text style={styles.protectionIcon}>🔒</Text>
                      <View>
                        <Text style={styles.protectionTitle}>Damage Protection</Text>
                        <Text style={styles.protectionDetail}>Covered up to $500</Text>
                      </View>
                    </View>
                    <View style={styles.protectionItem}>
                      <Text style={styles.protectionIcon}>✓</Text>
                      <View>
                        <Text style={styles.protectionTitle}>Verified Owner</Text>
                        <Text style={styles.protectionDetail}>ID & address confirmed</Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.rentButton}>
                    <Text style={styles.rentButtonText}>Request to Rent</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <Text style={styles.footerText}>🏠 Neighborly — Building stronger communities</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE8E3',
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF6B55',
  },
  joinButton: {
    backgroundColor: '#FF6B55',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  joinButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 16,
    lineHeight: 42,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B6B6B',
    marginBottom: 32,
    lineHeight: 26,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6B55',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B6B6B',
    fontWeight: '600',
    letterSpacing: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  toolCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  toolInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  toolIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  toolDetails: {
    flex: 1,
  },
  toolName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  toolLocation: {
    fontSize: 13,
    color: '#6B6B6B',
    marginBottom: 4,
  },
  toolRating: {
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D9F6B',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  availabilityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableText: {
    color: '#2D9F6B',
    fontSize: 12,
    fontWeight: '700',
  },
  rentedBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rentedText: {
    color: '#6B6B6B',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionTag: {
    backgroundColor: '#F5E6D3',
    color: '#FF6B55',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 1,
  },
  sectionHeading: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 24,
    lineHeight: 38,
  },
  problemGrid: {
    gap: 16,
  },
  problemCard: {
    backgroundColor: '#FFF8F0',
    padding: 24,
    borderRadius: 20,
    marginBottom: 12,
  },
  problemIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  problemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 8,
  },
  problemText: {
    fontSize: 15,
    color: '#6B6B6B',
    lineHeight: 22,
  },
  solutionSection: {
    backgroundColor: '#2D9F6B',
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  solutionTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 1,
  },
  solutionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 32,
    lineHeight: 38,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
  },
  ctaSection: {
    paddingHorizontal: 20,
    paddingVertical: 48,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaText: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#FF6B55',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#FF6B55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#6B6B6B',
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF8F0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: '85%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#2B2B2B',
  },
  modalIcon: {
    fontSize: 72,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2B2B2B',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalLocation: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalPriceCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  modalPriceSection: {
    flex: 1,
  },
  modalPriceLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 4,
  },
  modalPrice: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2D9F6B',
  },
  modalPriceUnit: {
    fontSize: 20,
    color: '#6B6B6B',
  },
  modalRatingSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalStars: {
    fontSize: 18,
    marginBottom: 4,
  },
  modalReviews: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  modalOwnerCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerInitial: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
  },
  ownerVerified: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  modalDescriptionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 15,
    color: '#6B6B6B',
    lineHeight: 22,
  },
  modalProtectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  protectionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  protectionIcon: {
    fontSize: 28,
  },
  protectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 2,
  },
  protectionDetail: {
    fontSize: 13,
    color: '#6B6B6B',
  },
  rentButton: {
    backgroundColor: '#FF6B55',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FF6B55',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  rentButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
