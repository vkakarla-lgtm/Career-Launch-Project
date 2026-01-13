import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface Tool {
  id: number;
  name: string;
  icon: string;
  category: string;
  price: number;
  owner: string;
  distance: number;
  rating: number;
  reviews: number;
  available: boolean;
}

const allTools: Tool[] = [
  { id: 1, name: 'Power Drill', icon: '🔧', category: 'Power Tools', price: 8, owner: 'Sarah M.', distance: 0.3, rating: 5, reviews: 47, available: true },
  { id: 2, name: 'Lawn Mower', icon: '🌿', category: 'Lawn & Garden', price: 15, owner: 'Mike R.', distance: 0.5, rating: 5, reviews: 32, available: true },
  { id: 3, name: 'Extension Ladder', icon: '🪜', category: 'Ladders', price: 12, owner: 'David L.', distance: 0.7, rating: 5, reviews: 28, available: true },
  { id: 4, name: 'Pressure Washer', icon: '💦', category: 'Cleaning', price: 20, owner: 'Jessica T.', distance: 0.4, rating: 5, reviews: 41, available: false },
  { id: 5, name: 'Circular Saw', icon: '⚙️', category: 'Power Tools', price: 10, owner: 'Robert K.', distance: 0.6, rating: 4, reviews: 19, available: true },
  { id: 6, name: 'Leaf Blower', icon: '🍂', category: 'Lawn & Garden', price: 8, owner: 'Amanda W.', distance: 0.3, rating: 5, reviews: 35, available: true },
  { id: 7, name: 'Hedge Trimmer', icon: '✂️', category: 'Lawn & Garden', price: 10, owner: 'Tom H.', distance: 0.8, rating: 5, reviews: 22, available: true },
  { id: 8, name: 'Angle Grinder', icon: '⚡', category: 'Power Tools', price: 12, owner: 'Lisa P.', distance: 0.9, rating: 4, reviews: 15, available: true },
  { id: 9, name: 'Shop Vacuum', icon: '🌪️', category: 'Cleaning', price: 8, owner: 'Kevin M.', distance: 0.4, rating: 5, reviews: 38, available: true },
  { id: 10, name: 'Nail Gun', icon: '🔫', category: 'Power Tools', price: 15, owner: 'Rachel S.', distance: 0.5, rating: 5, reviews: 29, available: false },
];

const categories = ['All', 'Power Tools', 'Lawn & Garden', 'Ladders', 'Cleaning'];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolPress = (tool: Tool) => {
    if (tool.available) {
      Alert.alert(
        tool.name,
        `Rent from ${tool.owner} for $${tool.price}/day?\n📍 ${tool.distance} miles away`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Request Rental', onPress: () => Alert.alert('Request Sent!', `${tool.owner} will respond within 24 hours.`) }
        ]
      );
    } else {
      Alert.alert('Not Available', 'This tool is currently rented. Would you like to be notified when it becomes available?');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Browse Tools
        </ThemedText>
        <Text style={styles.headerSubtitle}>
          {filteredTools.length} tools in your area
        </Text>
      </ThemedView>

      {/* Search Bar */}
      <ThemedView style={styles.searchSection}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={20} color="#6B6B6B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for drills, saws, mowers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9B9B9B"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color="#9B9B9B" />
            </TouchableOpacity>
          )}
        </View>
      </ThemedView>

      {/* Category Filter */}
      <View style={styles.categories}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryPill,
                selectedCategory === category && styles.categoryPillActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tools Grid */}
      <ThemedView style={styles.toolsGrid}>
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <TouchableOpacity
              key={tool.id}
              style={styles.toolCard}
              onPress={() => handleToolPress(tool)}
              activeOpacity={0.7}
            >
              <View style={styles.toolCardHeader}>
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                {!tool.available && (
                  <View style={styles.rentedBadge}>
                    <Text style={styles.rentedText}>Rented</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolCategory}>{tool.category}</Text>
              
              <View style={styles.toolFooter}>
                <View style={styles.priceSection}>
                  <Text style={styles.price}>${tool.price}</Text>
                  <Text style={styles.priceUnit}>/day</Text>
                </View>
                <Text style={styles.distance}>📍 {tool.distance}mi</Text>
              </View>

              <View style={styles.ownerSection}>
                <View style={styles.ownerAvatarSmall}>
                  <Text style={styles.ownerInitialSmall}>{tool.owner.charAt(0)}</Text>
                </View>
                <View style={styles.ratingSection}>
                  <Text style={styles.starIcon}>⭐</Text>
                  <Text style={styles.ratingText}>{tool.rating}.0</Text>
                  <Text style={styles.reviewCount}>({tool.reviews})</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No tools found</Text>
            <Text style={styles.emptyText}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ThemedView>

      {/* Bottom Spacing */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#6B6B6B',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2B2B2B',
  },
  categories: {
    marginBottom: 24,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryPillActive: {
    backgroundColor: '#FF6B55',
    borderColor: '#FF6B55',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  toolsGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  toolCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  toolCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  toolIcon: {
    fontSize: 40,
  },
  rentedBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rentedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9B9B9B',
  },
  toolName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  toolCategory: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 12,
  },
  toolFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D9F6B',
  },
  priceUnit: {
    fontSize: 11,
    color: '#9B9B9B',
    marginLeft: 2,
  },
  distance: {
    fontSize: 12,
    color: '#6B6B6B',
  },
  ownerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ownerAvatarSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerInitialSmall: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFF',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2B2B2B',
  },
  reviewCount: {
    fontSize: 11,
    color: '#9B9B9B',
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#6B6B6B',
    textAlign: 'center',
  },
});
