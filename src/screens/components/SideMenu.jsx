import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;

const SideMenu = ({ 
  isVisible, 
  slideAnim, 
  overlayOpacity, 
  onClose, 
  onMenuItemPress,
  profileName = "Anjana",
  menuItems = [
    { title: "Profile", action: "Profile" },
    { title: "Settings", action: "Settings" },
    { title: "Log out", action: "Log out" }
  ]
}) => {
  
  const MenuItem = ({ title, action }) => (
    <TouchableOpacity 
      style={styles.menuItem}
      onPress={() => onMenuItemPress(action)}
      activeOpacity={0.7}
    >
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );

  if (!isVisible) return null;

  return (
    <>
      {/* Dark Overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View 
          style={[
            styles.overlay,
            { opacity: overlayOpacity }
          ]} 
        />
      </TouchableWithoutFeedback>

      {/* Sliding Menu */}
      <Animated.View 
        style={[
          styles.slideMenu,
          { left: slideAnim }
        ]}
      >
        {/* Menu Header with Profile */}
        <View style={styles.menuHeader}>
          <View style={styles.menuProfileSection}>
            <View style={styles.menuProfilePicture}>
              <Text style={styles.menuProfileIcon}>👤</Text>
            </View>
            <Text style={styles.menuProfileName}>{profileName}</Text>
          </View>
        </View>

        {/* Menu Content */}
        <View style={styles.menuContent}>
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              title={item.title} 
              action={item.action}
            />
          ))}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 20,
  },
  slideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#67C7D4',
    zIndex: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  menuHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuProfileSection: {
    alignItems: 'center',
  },
  menuProfilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  menuProfileIcon: {
    fontSize: 28,
  },
  menuProfileName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
});

export default SideMenu;