import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Fallback icon components (simple text-based icons)
const SimpleIcon = ({ name, size = 20, color = 'white', style }) => {
  const iconMap = {
    'arrow-back': '←',
    'checkmark-circle': '✓',
    'information-circle-outline': 'ℹ',
    'calendar': '📅',
    'time': '⏰',
  };
  
  return (
    <Text style={[{ fontSize: size, color, textAlign: 'center' }, style]}>
      {iconMap[name] || '•'}
    </Text>
  );
};

const BookingScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [calendarDays, setCalendarDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('January 2025');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50));

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  useEffect(() => {
    generateCalendar();
    animateIn();
  }, [animateIn]);

  const generateCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = i < today.getDate() && currentMonth === today.getMonth();
      
      days.push({
        day: i,
        isWeekend,
        isPast,
        isToday: i === today.getDate() && currentMonth === today.getMonth(),
      });
    }
    setCalendarDays(days);
  };

  const selectDate = (dayObj) => {
    if (dayObj.isPast) {
      Alert.alert('Invalid Date', 'Cannot select past dates!');
      return;
    }
    
    // Simple scale animation without complex animations
    setSelectedDate(dayObj.day);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  const bookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert(
        '⚠️ Selection Required',
        'Please select both date and time before booking!',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    Alert.alert(
      '✅ Booking Confirmed',
      `Your appointment has been booked successfully!\n\n📅 Date: ${selectedDate} ${currentMonth}\n⏰ Time: ${selectedTime.label}\n\n📧 Confirmation email will be sent shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedDate(null);
            setSelectedTime(null);
            setTimeout(() => navigation.goBack(), 500);
          }
        }
      ]
    );
  };

  const goBack = () => {
    Alert.alert(
      'Confirm Navigation',
      'Are you sure you want to go back? Any unsaved selections will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Yes, Go Back', 
          style: 'destructive',
          onPress: () => navigation.goBack() 
        }
      ]
    );
  };

  const renderCalendarGrid = () => {
    return (
      <Animated.View 
        style={[
          styles.calendar,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <View style={styles.weekDays}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>
        </View>

        {/* Calendar Days */}
        <View style={styles.daysGrid}>
          {calendarDays.map((dayObj) => (
            <TouchableOpacity
              key={dayObj.day}
              style={[
                styles.dateCell,
                dayObj.isToday && styles.todayCell,
                selectedDate === dayObj.day && styles.selectedDateCell,
                dayObj.isPast && styles.pastDateCell,
                dayObj.isWeekend && styles.weekendCell,
              ]}
              onPress={() => selectDate(dayObj)}
              activeOpacity={dayObj.isPast ? 1 : 0.7}
              disabled={dayObj.isPast}
            >
              <Text
                style={[
                  styles.dateCellText,
                  dayObj.isToday && styles.todayText,
                  selectedDate === dayObj.day && styles.selectedDateText,
                  dayObj.isPast && styles.pastDateText,
                  dayObj.isWeekend && styles.weekendText,
                ]}
              >
                {dayObj.day}
              </Text>
              {dayObj.isToday && <View style={styles.todayDot} />}
              {selectedDate === dayObj.day && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedCheckmark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    );
  };

  const renderTimeButtons = () => {
    const timeOptions = [
      { key: 'morning', label: '🌅 MORNING', time: '8:00 AM - 12:00 PM', color: '#FF6B6B' },
      { key: 'afternoon', label: '☀️ AFTERNOON', time: '12:00 PM - 4:00 PM', color: '#4ECDC4' },
      { key: 'evening', label: '🌙 EVENING', time: '4:00 PM - 8:00 PM', color: '#45B7D1' },
    ];

    return (
      <Animated.View 
        style={[
          styles.timeButtons,
          { opacity: fadeAnim }
        ]}
      >
        {timeOptions.map((time, index) => (
          <TouchableOpacity
            key={time.key}
            style={[
              styles.timeBtn,
              { backgroundColor: selectedTime?.key === time.key ? '#2c3e50' : time.color },
              selectedTime?.key === time.key && styles.selectedTimeBtn,
            ]}
            onPress={() => selectTime(time)}
            activeOpacity={0.8}
          >
            <View style={styles.timeBtnContent}>
              <Text
                style={[
                  styles.timeBtnText,
                  selectedTime?.key === time.key && styles.selectedTimeBtnText,
                ]}
              >
                {time.label}
              </Text>
              <Text style={styles.timeSubText}>{time.time}</Text>
              {selectedTime?.key === time.key && (
                <View style={styles.timeSelectedIndicator}>
                  <Text style={styles.timeSelectedCheck}>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    );
  };

  const renderSelectedInfo = () => {
    if (!selectedDate && !selectedTime) return null;

    return (
      <Animated.View 
        style={[
          styles.selectedInfo,
          { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }
        ]}
      >
        <View style={styles.selectedInfoHeader}>
          <SimpleIcon name="checkmark-circle" size={20} color="#4ECDC4" />
          <Text style={styles.selectedInfoTitle}>Your Selection</Text>
        </View>
        
        <View style={styles.selectedInfoContent}>
          <View style={styles.selectedInfoRow}>
            <View style={styles.infoItem}>
              <SimpleIcon name="calendar" size={16} color="#666" />
              <Text style={styles.selectedInfoLabel}>Date</Text>
            </View>
            <Text style={styles.selectedInfoValue}>
              {selectedDate ? `${selectedDate} ${currentMonth}` : 'Not selected'}
            </Text>
          </View>
          
          <View style={styles.selectedInfoRow}>
            <View style={styles.infoItem}>
              <SimpleIcon name="time" size={16} color="#666" />
              <Text style={styles.selectedInfoLabel}>Time</Text>
            </View>
            <Text style={styles.selectedInfoValue}>
              {selectedTime ? selectedTime.label.replace(/[🌅☀️🌙]/g, '').trim() : 'Not selected'}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderBookButton = () => {
    const isBookingReady = selectedDate && selectedTime;
    
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={[
            styles.bookBtn,
            !isBookingReady && styles.bookBtnDisabled
          ]}
          onPress={bookAppointment}
          activeOpacity={0.9}
          disabled={!isBookingReady}
        >
          <View style={styles.bookBtnContent}>
            <SimpleIcon 
              name="checkmark-circle" 
              size={20} 
              color="white" 
              style={styles.bookBtnIcon}
            />
            <Text style={styles.bookBtnText}>
              {isBookingReady ? 'Confirm Booking' : 'Select Date & Time'}
            </Text>
          </View>
          {isBookingReady && (
            <View style={styles.bookingReadyGlow} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4ECDC4" />
      
      {/* Enhanced Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <SimpleIcon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <Text style={styles.headerSubtitle}>ACD-01_DB</Text>
        </View>
        <TouchableOpacity style={styles.infoBtn}>
          <SimpleIcon name="information-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Enhanced Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Date Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SimpleIcon name="calendar" size={20} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Select Date</Text>
          </View>
          {renderCalendarGrid()}
        </View>

        {/* Selected Info */}
        {renderSelectedInfo()}

        {/* Time Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SimpleIcon name="time" size={20} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Select Time</Text>
          </View>
          {renderTimeButtons()}
        </View>

        {/* Enhanced Book Button */}
        {renderBookButton()}
        
        {/* Extra spacing for better UX */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4ECDC4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#4ECDC4',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    minWidth: 40,
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  infoBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    minWidth: 40,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  calendarHeader: {
    marginBottom: 15,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    width: (width - 90) / 7,
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dateCell: {
    width: (width - 90) / 7,
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  todayCell: {
    borderColor: '#4ECDC4',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  selectedDateCell: {
    backgroundColor: '#4ECDC4',
    transform: [{ scale: 1.05 }],
    ...Platform.select({
      ios: {
        shadowColor: '#4ECDC4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  pastDateCell: {
    backgroundColor: '#e9ecef',
    opacity: 0.5,
  },
  weekendCell: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  dateCellText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  todayText: {
    color: '#4ECDC4',
    fontWeight: '700',
  },
  selectedDateText: {
    color: 'white',
    fontWeight: '700',
  },
  pastDateText: {
    color: '#adb5bd',
  },
  weekendText: {
    color: '#FF6B6B',
  },
  todayDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ECDC4',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCheckmark: {
    color: '#4ECDC4',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectedInfo: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#4ECDC4',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  selectedInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginLeft: 8,
  },
  selectedInfoContent: {
    gap: 12,
  },
  selectedInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedInfoLabel: {
    color: '#666',
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedInfoValue: {
    color: '#2c3e50',
    fontWeight: '700',
    fontSize: 16,
  },
  timeButtons: {
    gap: 15,
  },
  timeBtn: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  selectedTimeBtn: {
    transform: [{ scale: 1.02 }],
  },
  timeBtnContent: {
    alignItems: 'center',
    position: 'relative',
  },
  timeBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
  },
  selectedTimeBtnText: {
    color: 'white',
  },
  timeSubText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  timeSelectedIndicator: {
    position: 'absolute',
    top: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSelectedCheck: {
    color: '#2c3e50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookBtn: {
    backgroundColor: '#2c3e50',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#2c3e50',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  bookBtnDisabled: {
    backgroundColor: '#adb5bd',
    opacity: 0.7,
  },
  bookBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookBtnIcon: {
    marginRight: 10,
  },
  bookBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bookingReadyGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
});

export default BookingScreen;