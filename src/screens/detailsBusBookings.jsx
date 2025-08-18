// import React from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   FlatList,
// } from 'react-native';

// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// export default function BusScheduleScreen({ navigation, route }) {
//   // Get bus information from route params with defaults
//   const busInfo = route?.params || {
//     busId: 'ACD-01-DB',
//     busNumber: 'ACD-01-DB',
//   };

//   const handleBackClick = () => {
//     navigation.goBack();
//   };

//   const handleBookPress = () => {
//     navigation.navigate('BookingDate');
//   };

//   const daily = [
//     {
//       id: 'galle-makubura',
//       start: 'Galle',
//       end: 'Makubura',
//       schedules: [
//         { id: 'morning', startTime: '06:00', endTime: '08:30' },
//         { id: 'afternoon', startTime: '12:00', endTime: '14:30' },
//       ],
//     },
//     {
//       id: 'makubura-galle',
//       start: 'Makubura',
//       end: 'Galle',
//       schedules: [
//         { id: 'morning', startTime: '09:00', endTime: '11:30' },
//         { id: 'afternoon', startTime: '15:00', endTime: '17:30' },
//       ],
//     },
//   ];

//   const renderRoute = ({ item }) => (
//     <View style={styles.routeContainer}>
//       <Text style={styles.routeTitle}>
//         {item.start} → {item.end}
//       </Text>

//       {item.schedules.map(schedule => (
//         <TouchableOpacity
//           key={schedule.id}
//           style={styles.scheduleCard}
//           onPress={handleBookPress}
//         >
//           <View style={styles.scheduleTimes}>
//             <Text style={styles.timeText}>
//               <Icon name="arrow-up" size={14} color="#22D3EE" /> Depart:{' '}
//               {schedule.startTime}
//             </Text>
//             <Text style={styles.timeText}>
//               <Icon name="arrow-down" size={14} color="#22D3EE" /> Arrive:{' '}
//               {schedule.endTime}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
//           <Icon name="arrow-left" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
//         <View style={styles.backButton} />
//       </View>

//       {/* Content */}
//       <ScrollView style={styles.content}>
//         {/* Bus Info Card */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Bus:</Text>
//             <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Contact:</Text>
//             <View style={styles.contactContainer}>
//               <Text style={styles.infoValue}>070 435 3463</Text>
//               <Text style={styles.flag}>🇱🇰</Text>
//             </View>
//           </View>
//         </View>

//         {/* Schedule List */}
//         <FlatList
//           data={daily}
//           renderItem={renderRoute}
//           keyExtractor={item => item.id}
//           scrollEnabled={false}
//           contentContainerStyle={styles.scheduleList}
//         />

//         {/* Remaining Seats */}
//         <View style={styles.seatsContainer}>
//           <Text style={styles.seatsText}>Remaining Seats: 10</Text>
//         </View>
//       </ScrollView>

//       {/* Fixed Book Button */}
//       <TouchableOpacity style={styles.bookButton} onPress={handleBookPress}>
//         <Text style={styles.bookButtonText}>Book Now</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   header: {
//     backgroundColor: '#22D3EE',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     width: 40,
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     fontWeight: '600',
//     flex: 1,
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   infoCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 25,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   infoLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2C5F7C',
//     width: 80,
//   },
//   infoValue: {
//     fontSize: 16,
//     color: '#2C5F7C',
//     fontWeight: '500',
//   },
//   contactContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flag: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   scheduleList: {
//     paddingBottom: 20,
//   },
//   routeContainer: {
//     marginBottom: 25,
//   },
//   routeTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#2C5F7C',
//     marginBottom: 15,
//   },
//   scheduleCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   scheduleTimes: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   timeText: {
//     fontSize: 16,
//     color: '#374151',
//   },
//   seatsContainer: {
//     marginVertical: 20,
//     alignItems: 'center',
//   },
//   seatsText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#2C5F7C',
//   },
//   bookButton: {
//     backgroundColor: '#374151',
//     padding: 18,
//     marginHorizontal: 20,
//     marginBottom: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   bookButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });


import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function BusScheduleScreen({ navigation, route }) {
  const busInfo = route?.params || {
    busId: 'ACD-01-DB',
    busNumber: 'ACD-01-DB',
  };

  const handleBackClick = () => {
    navigation.goBack();
  };

  const handleBookPress = () => {
    navigation.navigate('BookingDate');
  };

  const daily = [
    {
      id: 'galle-makubura',
      start: 'Galle',
      end: 'Makubura',
      schedules: [
        { id: 'morning', startTime: '06:00', endTime: '08:30', type: 'Morning' },
        { id: 'afternoon', startTime: '12:00', endTime: '14:30', type: 'Afternoon' },
      ],
    },
    {
      id: 'makubura-galle',
      start: 'Makubura',
      end: 'Galle',
      schedules: [
        { id: 'morning', startTime: '09:00', endTime: '11:30', type: 'Morning' },
        { id: 'afternoon', startTime: '15:00', endTime: '17:30', type: 'Afternoon' },
      ],
    },
  ];

  const renderRoute = ({ item }) => (
    <View style={styles.routeContainer}>
      <View style={styles.routeHeader}>
        <View style={styles.routeCircle}>
          <Icon name="map-marker" size={16} color="#FFFFFF" />
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeCircle}>
          <Icon name="map-marker" size={16} color="#FFFFFF" />
        </View>
      </View>
      
      <View style={styles.routeTitleContainer}>
        <Text style={styles.routeTitle}>{item.start}</Text>
        <Icon name="arrow-right" size={18} color="#6366F1" style={styles.arrowIcon} />
        <Text style={styles.routeTitle}>{item.end}</Text>
      </View>

      <View style={styles.schedulesContainer}>
        {item.schedules.map(schedule => (
          <TouchableOpacity
            key={schedule.id}
            style={styles.scheduleCard}
            onPress={handleBookPress}
            activeOpacity={0.8}
          >
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleTypeContainer}>
                <Icon 
                  name={schedule.type === 'Morning' ? 'sun-o' : 'moon-o'} 
                  size={16} 
                  color="#6366F1" 
                />
                <Text style={styles.scheduleType}>{schedule.type}</Text>
              </View>
              <View style={styles.durationContainer}>
                <Icon name="clock-o" size={12} color="#64748B" />
                <Text style={styles.duration}>2h 30m</Text>
              </View>
            </View>
            
            <View style={styles.timeContainer}>
              <View style={styles.timeSection}>
                <Text style={styles.timeLabel}>Departure</Text>
                <Text style={styles.timeValue}>{schedule.startTime}</Text>
              </View>
              
              <View style={styles.journeyLine}>
                <View style={styles.journeyDot} />
                <View style={styles.journeyTrack} />
                <View style={styles.journeyDot} />
              </View>
              
              <View style={styles.timeSection}>
                <Text style={styles.timeLabel}>Arrival</Text>
                <Text style={styles.timeValue}>{schedule.endTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4F46E5" barStyle="light-content" />
      
      {/* Enhanced Header with Gradient */}
      <LinearGradient
        colors={['#4F46E5', '#6366F1', '#8B5CF6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
          <View style={styles.backButtonCircle}>
            <Icon name="arrow-left" size={20} color="#4F46E5" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{busInfo.busNumber}</Text>
          <Text style={styles.headerSubtitle}>Bus Schedule</Text>
        </View>
        
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-v" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Enhanced Bus Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <View style={styles.busIconContainer}>
              <Icon name="bus" size={24} color="#6366F1" />
            </View>
            <Text style={styles.infoCardTitle}>Bus Information</Text>
          </View>
          
          <View style={styles.infoContent}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="id-card-o" size={16} color="#64748B" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Bus Number</Text>
                <Text style={styles.infoValue}>{busInfo.busNumber}</Text>
              </View>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <Icon name="phone" size={16} color="#64748B" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Contact Number</Text>
                <View style={styles.contactRow}>
                  <Text style={styles.infoValue}>070 435 3463</Text>
                  <Text style={styles.flag}>🇱🇰</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Routes Section */}
        <View style={styles.routesSection}>
          <Text style={styles.sectionTitle}>Available Routes</Text>
          <FlatList
            data={daily}
            renderItem={renderRoute}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Enhanced Seats Info */}
        <View style={styles.seatsCard}>
          <View style={styles.seatsHeader}>
            <Icon name="users" size={20} color="#10B981" />
            <Text style={styles.seatsTitle}>Seat Availability</Text>
          </View>
          <View style={styles.seatsContent}>
            <Text style={styles.availableSeats}>10</Text>
            <Text style={styles.seatsLabel}>seats remaining</Text>
          </View>
          <View style={styles.seatsProgress}>
            <View style={styles.seatsProgressFilled} />
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Enhanced Book Button */}
      <View style={styles.bookButtonContainer}>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={handleBookPress}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#4F46E5', '#6366F1']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.bookButtonGradient}
          >
            <Icon name="calendar-check-o" size={20} color="#FFFFFF" />
            <Text style={styles.bookButtonText}>Book Your Seat</Text>
            <Icon name="arrow-right" size={16} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  headerSubtitle: {
    color: '#E0E7FF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    width: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
  },
  busIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 16,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
  routesSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 20,
  },
  routeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  routeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 10,
  },
  routeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  arrowIcon: {
    marginHorizontal: 12,
  },
  schedulesContainer: {
    gap: 12,
  },
  scheduleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginLeft: 6,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeSection: {
    alignItems: 'center',
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 18,
    color: '#1E293B',
    fontWeight: '700',
  },
  journeyLine: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    paddingHorizontal: 20,
  },
  journeyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366F1',
  },
  journeyTrack: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  seatsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  seatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  seatsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 10,
  },
  seatsContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  availableSeats: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10B981',
    marginBottom: 4,
  },
  seatsLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  seatsProgress: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  seatsProgressFilled: {
    height: '100%',
    width: '33%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  bottomSpacing: {
    height: 100,
  },
  bookButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 12,
  },
});