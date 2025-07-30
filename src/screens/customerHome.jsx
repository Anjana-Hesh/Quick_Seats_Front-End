import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const IconWrapper = ({ children, style }) => (
  <View style={[styles.iconWrapper, style]}>{children}</View>
);

const UserIcon = ({ size = 24, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MessageIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const XIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FollowingScreen = () => {
  const [followings, setFollowings] = useState([
    { id: 1, name: 'ACD-01-DB' },
    { id: 2, name: 'ACD-02-DB' },
    { id: 3, name: 'ACD-03-DB' },
    { id: 4, name: 'ACD-04-DB' },
    { id: 5, name: 'ACD-05-DB' },
    { id: 6, name: 'ACD-06-DB' },
    { id: 7, name: 'ACD-07-DB' },
  ]);

  const addNewFollowing = () => {
    const newId = followings.length + 1;
    const newFollowing = {
      id: newId,
      name: `ACD-${String(newId).padStart(2, '0')}-DB`,
    };
    setFollowings([...followings, newFollowing]);
  };

  const removeFollowing = (id) => {
    setFollowings(followings.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.followingItem}>
      <View style={styles.itemLeft}>
        <IconWrapper style={styles.avatar}>
          <UserIcon color="#7C3AED" />
        </IconWrapper>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
      <View style={styles.itemRight}>
        <IconWrapper style={styles.messageIcon}>
          <MessageIcon />
        </IconWrapper>
        <TouchableOpacity onPress={() => removeFollowing(item.id)} style={styles.removeBtn}>
          <XIcon size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi Anjana</Text>
        <TouchableOpacity onPress={addNewFollowing} style={styles.addBtn}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
      <FlatList
        data={followings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
  },
  addBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#2DD4BF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 60,
  },
  followingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#9CA3AF',
    marginRight: 12,
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageIcon: {
    backgroundColor: '#7C3AED',
    padding: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  removeBtn: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 6,
  },
  iconWrapper: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FollowingScreen;
