// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Alert,
//   Modal,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

// // Utility function to get stored data
// async function getLocalDataTime() {
//   try {
//     const data = await AsyncStorage.getItem('selectedData');
//     if (data !== null) {
//       const d = JSON.parse(data);
//       console.log('Retrieved data:', d);
//       return d;
//     }
//     return null;
//   } catch (error) {
//     console.log('Error reading route:', error);
//     return null;
//   }
// }

// // Utility function to store data
// async function storeLocalData(key, data) {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(data));
//     console.log('Data stored successfully:', data);
//   } catch (error) {
//     console.log('Error storing data:', error);
//   }
// }

// const BusFormScreen = ({ navigation }) => {
//   // Bus basic information
//   const [busData, setBusData] = useState({
//     busName: '',
//     busNumber: '',
//     seatColumns: '',
//     seatRows: '',
//     notes: '',
//   });

//   // Schedules state - This is the main array that stores all schedules
//   const [schedules, setSchedules] = useState([]);
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [editingSchedule, setEditingSchedule] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setBusErrors] = useState({});

//   // Schedule form state
//   const [scheduleForm, setScheduleForm] = useState({
//     startTime: '',
//     endTime: '',
//     route: {
//       startLocation: '',
//       endLocation: '',
//     },
//     fare: '',
//   });
//   const [scheduleErrors, setScheduleErrors] = useState({});

//   // Load any existing data on component mount
//   useEffect(() => {
//     loadExistingData();
//   }, []);

//   // Function to load existing data from AsyncStorage
//   const loadExistingData = async () => {
//     try {
//       const existingData = await getLocalDataTime();
//       if (existingData) {
//         if (existingData.busData) {
//           setBusData(existingData.busData);
//         }
//         if (existingData.schedules && Array.isArray(existingData.schedules)) {
//           setSchedules(existingData.schedules);
//         }
//       }
//     } catch (error) {
//       console.log('Error loading existing data:', error);
//     }
//   };

//   // Auto-save schedules to AsyncStorage whenever schedules array changes
//   useEffect(() => {
//     if (schedules.length > 0) {
//       storeLocalData('busSchedules', { busData, schedules });
//       console.log('Updated schedules array:', schedules);
//     }
//   }, [schedules, busData]);

//   // Validation functions
//   const validateBusForm = () => {
//     const newErrors = {};

//     if (!busData.busName.trim()) {
//       newErrors.busName = 'Bus name is required';
//     }

//     if (!busData.busNumber.trim()) {
//       newErrors.busNumber = 'Bus number is required';
//     }

//     if (!busData.seatColumns.trim()) {
//       newErrors.seatColumns = 'Seat columns are required';
//     } else if (
//       isNaN(busData.seatColumns) ||
//       parseInt(busData.seatColumns) <= 0
//     ) {
//       newErrors.seatColumns = 'Please enter a valid number of columns';
//     }

//     if (!busData.seatRows.trim()) {
//       newErrors.seatRows = 'Seat rows are required';
//     } else if (isNaN(busData.seatRows) || parseInt(busData.seatRows) <= 0) {
//       newErrors.seatRows = 'Please enter a valid number of rows';
//     }

//     if (schedules.length === 0) {
//       newErrors.schedules = 'At least one schedule is required';
//     }

//     setBusErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateScheduleForm = () => {
//     const newErrors = {};

//     if (!scheduleForm.startLocation.trim()) {
//       newErrors.startLocation = 'Start location is required';
//     }

//     if (!scheduleForm.endLocation.trim()) {
//       newErrors.endLocation = 'End location is required';
//     }

//     if (!scheduleForm.startTime.trim()) {
//       newErrors.startTime = 'Start time is required';
//     } else if (!isValidTime(scheduleForm.startTime)) {
//       newErrors.startTime = 'Please enter valid time format (HH:MM)';
//     }

//     if (!scheduleForm.endTime.trim()) {
//       newErrors.endTime = 'End time is required';
//     } else if (!isValidTime(scheduleForm.endTime)) {
//       newErrors.endTime = 'Please enter valid time format (HH:MM)';
//     }

//     if (!scheduleForm.fare.trim()) {
//       newErrors.fare = 'Fare is required';
//     } else if (isNaN(scheduleForm.fare) || parseFloat(scheduleForm.fare) <= 0) {
//       newErrors.fare = 'Please enter a valid fare amount';
//     }

//     // Check if start time is before end time
//     if (
//       scheduleForm.startTime &&
//       scheduleForm.endTime &&
//       isValidTime(scheduleForm.startTime) &&
//       isValidTime(scheduleForm.endTime)
//     ) {
//       const startMinutes = timeToMinutes(scheduleForm.startTime);
//       const endMinutes = timeToMinutes(scheduleForm.endTime);

//       if (startMinutes >= endMinutes) {
//         newErrors.endTime = 'End time must be after start time';
//       }
//     }

//     // Check for duplicate routes (same start and end location with overlapping times)
//     const isDuplicate = schedules.some(schedule => {
//       if (editingSchedule && schedule.id === editingSchedule) {
//         return false; // Skip the one being edited
//       }
//       return (
//         schedule.startLocation.toLowerCase() ===
//           scheduleForm.startLocation.toLowerCase() &&
//         schedule.endLocation.toLowerCase() ===
//           scheduleForm.endLocation.toLowerCase() &&
//         schedule.startTime === scheduleForm.startTime
//       );
//     });

//     if (isDuplicate) {
//       newErrors.startTime =
//         'A schedule with this route and time already exists';
//     }

//     setScheduleErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isValidTime = time => {
//     const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     return timeRegex.test(time);
//   };

//   const timeToMinutes = time => {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const formatTimeInput = text => {
//     // Remove non-numeric characters
//     const cleaned = text.replace(/\D/g, '');

//     // Format as HH:MM
//     if (cleaned.length >= 3) {
//       return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
//     } else if (cleaned.length >= 1) {
//       return cleaned;
//     }
//     return '';
//   };

//   // Handle bus data changes
//   const updateBusData = (field, value) => {
//     setBusData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setBusErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   // Handle schedule form changes
//   const updateScheduleForm = (field, value) => {
//     if (field === 'startTime' || field === 'endTime') {
//       value = formatTimeInput(value);
//     }
//     setScheduleForm(prev => ({ ...prev, [field]: value }));
//     if (scheduleErrors[field]) {
//       setScheduleErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   // Schedule management functions
//   const openScheduleModal = (schedule = null) => {
//     if (schedule) {
//       setScheduleForm({ ...schedule }); // Create a copy to avoid reference issues
//       setEditingSchedule(schedule.id);
//     } else {
//       setScheduleForm({
//         startTime: '',
//         endTime: '',
//         route: {
//           startLocation: '',
//           endLocation: '',
//         },
//         fare: '',
//       });
//       setEditingSchedule(null);
//     }
//     setScheduleErrors({});
//     setShowScheduleModal(true);
//   };

//   // ENHANCED: Save schedule to array with proper ID generation
//   const saveSchedule = () => {
//     if (!validateScheduleForm()) {
//       return;
//     }

//     const scheduleId =
//       editingSchedule ||
//       `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//     const newSchedule = {
//       id: scheduleId,
//       startTime: scheduleForm.startTime.trim(),
//       endTime: scheduleForm.endTime.trim(),
//       route: {
//         start: scheduleForm.startLocation.trim(),
//         end: scheduleForm.endLocation.trim(),
//       },
//       fare: parseFloat(scheduleForm.fare).toFixed(2),
//       createdAt: editingSchedule
//         ? schedules.find(s => s.id === editingSchedule)?.createdAt
//         : new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     if (editingSchedule) {
//       // UPDATE: Replace existing schedule in array
//       setSchedules(prevSchedules => {
//         const updatedSchedules = prevSchedules.map(s =>
//           s.id === editingSchedule ? newSchedule : s,
//         );
//         console.log('Updated schedule in array:', newSchedule);
//         console.log('Full schedules array after update:', updatedSchedules);
//         return updatedSchedules;
//       });
//     } else {
//       // ADD: Add new schedule to array
//       setSchedules(prevSchedules => {
//         const updatedSchedules = [...prevSchedules, newSchedule];
//         console.log('Added new schedule to array:', newSchedule);
//         console.log('Full schedules array after addition:', updatedSchedules);
//         return updatedSchedules;
//       });
//     }

//     setShowScheduleModal(false);
//     setEditingSchedule(null);
//     resetScheduleForm();

//     // Clear schedules error if it exists
//     if (errors.schedules) {
//       setBusErrors(prev => ({ ...prev, schedules: '' }));
//     }

//     // Show success message
//     Alert.alert(
//       'Success',
//       `Schedule ${editingSchedule ? 'updated' : 'added'} successfully!`,
//       [{ text: 'OK' }],
//     );
//   };

//   // ENHANCED: Delete schedule from array with confirmation
//   const deleteSchedule = scheduleId => {
//     const scheduleToDelete = schedules.find(s => s.id === scheduleId);

//     Alert.alert(
//       'Delete Schedule',
//       `Are you sure you want to delete the schedule from ${scheduleToDelete?.startLocation} to ${scheduleToDelete?.endLocation}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             // REMOVE: Filter out the deleted schedule
//             setSchedules(prevSchedules => {
//               const updatedSchedules = prevSchedules.filter(
//                 s => s.id !== scheduleId,
//               );
//               console.log('Deleted schedule with ID:', scheduleId);
//               console.log('Remaining schedules:', updatedSchedules);
//               return updatedSchedules;
//             });

//             Alert.alert('Deleted', 'Schedule deleted successfully!', [
//               { text: 'OK' },
//             ]);
//           },
//         },
//       ],
//     );
//   };

//   // Helper function to reset schedule form
//   const resetScheduleForm = () => {
//     setScheduleForm({
//       startTime: '',
//       endTime: '',
//       route: {
//         startLocation: '',
//         endLocation: '',
//       },
//       fare: '',
//     });
//     setScheduleErrors({});
//   };

//   // ENHANCED: Clear all schedules with confirmation
//   const clearAllSchedules = () => {
//     Alert.alert(
//       'Clear All Schedules',
//       'Are you sure you want to remove all schedules? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Clear All',
//           style: 'destructive',
//           onPress: () => {
//             setSchedules([]);
//             console.log('All schedules cleared');
//             Alert.alert('Cleared', 'All schedules have been removed!');
//           },
//         },
//       ],
//     );
//   };

//   // API call function with enhanced schedule data
//   const saveBusData = async () => {
//     try {
//       setLoading(true);
//       const totalSeats =
//         parseInt(busData.seatColumns) * parseInt(busData.seatRows);
//       const user = await getLocalDataTime();
//       const busPayload = {
//         name: busData.busName.trim(),
//         id: busData.busNumber.trim(),
//         seatDetails: {
//           left: parseInt(busData.seatColumns),
//           right: parseInt(busData.seatRows),
//           row: totalSeats,
//         },
//         schedules: schedules.map(schedule => ({
//           id: schedule.id,
//           startTime: schedule.startTime,
//           endTime: schedule.endTime,
//           route: {
//             startLocation: schedule.startLocation,
//             endLocation: schedule.endLocation,
//           },
//           fare: parseFloat(schedule.fare),
//           createdAt: schedule.createdAt,
//           updatedAt: schedule.updatedAt,
//         })),
//         notes: busData.notes.trim(),
//         createdAt: new Date().toISOString(),
//       };
//       if (!Array.isArray(user._j.bus)) {
//         user._j.bus = []; // ensure bus is an array
//       }
//       user._j.bus.push(busPayload);

//       console.log('Final bus data to save:', busPayload);
//       console.log('Total schedules being saved:', schedules.length);
//       console.log('bus data with user:', user._j);

//       // Store in AsyncStorage before API call
//       await storeLocalData('finalBusData', busPayload);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       Alert.alert('Success!', 'Bus information saved successfully.', [
//         {
//           text: 'OK',
//           onPress: () => navigation.goBack(),
//         },
//       ]);

//       // Here you would make the actual API call
//       /*
//       const response = await fetch('your-api-endpoint', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer your-token',
//         },
//         body: JSON.stringify(busPayload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save bus data');
//       }

//       const result = await response.json();
//       console.log('API Response:', result);
//       */
//     } catch (error) {
//       console.error('Save error:', error);
//       Alert.alert('Error', 'Failed to save bus information. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     if (!validateBusForm()) {
//       Alert.alert('Validation Error', 'Please fix the errors in the form.');
//       return;
//     }

//     const totalSchedules = schedules.length;
//     Alert.alert(
//       'Save Bus Information',
//       `Save bus details for "${
//         busData.busName
//       }" with ${totalSchedules} schedule${totalSchedules !== 1 ? 's' : ''}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Save', onPress: saveBusData },
//       ],
//     );
//   };

//   // Enhanced schedule item rendering with more details
//   const renderScheduleItem = ({ item, index }) => (
//     <View style={styles.scheduleItem}>
//       <View style={styles.scheduleHeader}>
//         <View style={styles.scheduleNumberBadge}>
//           <Text style={styles.scheduleNumberText}>{index + 1}</Text>
//         </View>
//         <Text style={styles.scheduleTitle}>
//           {item.startLocation} → {item.endLocation}
//         </Text>
//         <View style={styles.scheduleActions}>
//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={() => openScheduleModal(item)}
//           >
//             <Text style={styles.editButtonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.deleteButton}
//             onPress={() => deleteSchedule(item.id)}
//           >
//             <Text style={styles.deleteButtonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.scheduleDetails}>
//         <Text style={styles.scheduleTime}>
//           ⏰ {item.startTime} - {item.endTime}
//         </Text>
//         <Text style={styles.scheduleFare}>💰 Rs. {item.fare}</Text>
//         {item.updatedAt && (
//           <Text style={styles.scheduleUpdated}>
//             Last updated: {new Date(item.updatedAt).toLocaleString()}
//           </Text>
//         )}
//       </View>
//     </View>
//   );

//   const InputField = ({
//     placeholder,
//     value,
//     onChangeText,
//     error,
//     keyboardType = 'default',
//     autoCapitalize = 'sentences',
//     multiline = false,
//     numberOfLines = 1,
//     style = {},
//   }) => (
//     <View style={styles.inputWrapper}>
//       <TextInput
//         style={[
//           styles.input,
//           multiline && styles.multilineInput,
//           error && styles.inputError,
//           style,
//         ]}
//         placeholder={placeholder}
//         placeholderTextColor="#9CA3AF"
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//         multiline={multiline}
//         numberOfLines={numberOfLines}
//         textAlignVertical={multiline ? 'top' : 'center'}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.gradientBackground} />

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentCard}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Bus Registration</Text>

//         {/* Bus Information Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bus Information</Text>

//           <InputField
//             placeholder="Bus Name"
//             value={busData.busName}
//             onChangeText={value => updateBusData('busName', value)}
//             error={errors.busName}
//             autoCapitalize="words"
//           />

//           <InputField
//             placeholder="Bus Number (e.g., ABC-1234)"
//             value={busData.busNumber}
//             onChangeText={value => updateBusData('busNumber', value)}
//             error={errors.busNumber}
//             autoCapitalize="characters"
//           />

//           <View style={styles.row}>
//             <View style={styles.halfWidth}>
//               <InputField
//                 placeholder="Seat Columns"
//                 value={busData.seatColumns}
//                 onChangeText={value => updateBusData('seatColumns', value)}
//                 error={errors.seatColumns}
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={styles.halfWidth}>
//               <InputField
//                 placeholder="Seat Rows"
//                 value={busData.seatRows}
//                 onChangeText={value => updateBusData('seatRows', value)}
//                 error={errors.seatRows}
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>

//           {busData.seatColumns && busData.seatRows && (
//             <Text style={styles.seatInfo}>
//               Total Seats:{' '}
//               {parseInt(busData.seatColumns || 0) *
//                 parseInt(busData.seatRows || 0)}
//             </Text>
//           )}

//           <InputField
//             placeholder="Additional Notes (Optional)"
//             value={busData.notes}
//             onChangeText={value => updateBusData('notes', value)}
//             multiline={true}
//             numberOfLines={3}
//           />
//         </View>

//         {/* Schedules Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionTitle}>
//                 Schedules ({schedules.length})
//               </Text>
//               {schedules.length > 0 && (
//                 <Text style={styles.sectionSubtitle}>
//                   {schedules.length} schedule{schedules.length !== 1 ? 's' : ''}{' '}
//                   added
//                 </Text>
//               )}
//             </View>
//             <View style={styles.scheduleHeaderActions}>
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => openScheduleModal()}
//               >
//                 <Text style={styles.addButtonText}>+ Add</Text>
//               </TouchableOpacity>
//               {schedules.length > 1 && (
//                 <TouchableOpacity
//                   style={styles.clearButton}
//                   onPress={clearAllSchedules}
//                 >
//                   <Text style={styles.clearButtonText}>Clear All</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {errors.schedules ? (
//             <Text style={styles.errorText}>{errors.schedules}</Text>
//           ) : null}

//           {schedules.length > 0 ? (
//             <FlatList
//               data={schedules}
//               renderItem={renderScheduleItem}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               ItemSeparatorComponent={() => (
//                 <View style={styles.scheduleSeparator} />
//               )}
//             />
//           ) : (
//             <View style={styles.emptyScheduleContainer}>
//               <Text style={styles.emptyText}>No schedules added yet</Text>
//               <Text style={styles.emptySubtext}>
//                 Add your first schedule to get started
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionButtons}>
//           <TouchableOpacity
//             style={[styles.saveButton, loading && styles.saveButtonDisabled]}
//             onPress={handleSave}
//             disabled={loading}
//             activeOpacity={0.8}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" size="small" />
//             ) : (
//               <Text style={styles.saveButtonText}>
//                 Save Bus Information{' '}
//                 {schedules.length > 0 && `(${schedules.length} schedules)`}
//               </Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Schedule Modal */}
//       <Modal
//         visible={showScheduleModal}
//         animationType="slide"
//         presentationStyle="pageSheet"
//         onRequestClose={() => setShowScheduleModal(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>
//               {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowScheduleModal(false)}
//             >
//               <Text style={styles.closeButtonText}>×</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             style={styles.modalContent}
//             keyboardShouldPersistTaps="handled"
//           >
//             <InputField
//               placeholder="Start Location (e.g., Colombo)"
//               value={scheduleForm.startLocation}
//               onChangeText={value => updateScheduleForm('startLocation', value)}
//               error={scheduleErrors.startLocation}
//               autoCapitalize="words"
//             />

//             <InputField
//               placeholder="End Location (e.g., Kandy)"
//               value={scheduleForm.endLocation}
//               onChangeText={value => updateScheduleForm('endLocation', value)}
//               error={scheduleErrors.endLocation}
//               autoCapitalize="words"
//             />

//             <View style={styles.row}>
//               <View style={styles.halfWidth}>
//                 <InputField
//                   placeholder="Start Time (HH:MM)"
//                   value={scheduleForm.startTime}
//                   onChangeText={value => updateScheduleForm('startTime', value)}
//                   error={scheduleErrors.startTime}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.halfWidth}>
//                 <InputField
//                   placeholder="End Time (HH:MM)"
//                   value={scheduleForm.endTime}
//                   onChangeText={value => updateScheduleForm('endTime', value)}
//                   error={scheduleErrors.endTime}
//                   keyboardType="numeric"
//                 />
//               </View>
//             </View>

//             <InputField
//               placeholder="Fare Amount (Rs.)"
//               value={scheduleForm.fare}
//               onChangeText={value => updateScheduleForm('fare', value)}
//               error={scheduleErrors.fare}
//               keyboardType="decimal-pad"
//             />

//             <TouchableOpacity
//               style={styles.modalSaveButton}
//               onPress={saveSchedule}
//             >
//               <Text style={styles.modalSaveButtonText}>
//                 {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
//               </Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </Modal>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: height * 0.3,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: height * 0.08,
//   },
//   contentCard: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 25,
//     paddingTop: 30,
//     paddingBottom: 50,
//     minHeight: height * 0.95,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1F2937',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   inputWrapper: {
//     marginBottom: 15,
//   },
//   input: {
//     height: 55,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     backgroundColor: '#FAFAFA',
//     color: '#1F2937',
//   },
//   multilineInput: {
//     height: 100,
//     paddingTop: 15,
//   },
//   inputError: {
//     borderColor: '#EF4444',
//     borderWidth: 2,
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   row: {
//     flexDirection: 'row',
//     gap: 15,
//   },
//   halfWidth: {
//     flex: 1,
//   },
//   seatInfo: {
//     fontSize: 14,
//     color: '#059669',
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 15,
//     backgroundColor: '#ECFDF5',
//     padding: 10,
//     borderRadius: 8,
//   },
//   addButton: {
//     backgroundColor: '#3B82F6',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: 16,
//     fontStyle: 'italic',
//     marginVertical: 20,
//   },
//   scheduleItem: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   scheduleTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//     flex: 1,
//   },
//   scheduleActions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   editButton: {
//     backgroundColor: '#3B82F6',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   deleteButton: {
//     backgroundColor: '#EF4444',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   scheduleDetails: {
//     gap: 5,
//   },
//   scheduleTime: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   scheduleFare: {
//     fontSize: 14,
//     color: '#059669',
//     fontWeight: '600',
//   },
//   actionButtons: {
//     gap: 15,
//   },
//   saveButton: {
//     backgroundColor: '#1F2937',
//     paddingVertical: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#1F2937',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   saveButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     paddingVertical: 15,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: '#6B7280',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   // Modal styles
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   closeButton: {
//     padding: 5,
//   },
//   closeButtonText: {
//     fontSize: 24,
//     color: '#6B7280',
//   },
//   modalContent: {
//     flex: 1,
//     padding: 20,
//   },
//   modalSaveButton: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   modalSaveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default BusFormScreen; ///////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   Alert,
//   Modal,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width, height } = Dimensions.get('window');

// // Utility functions for data management
// const getUsersArray = async () => {
//   try {
//     const usersData = await AsyncStorage.getItem('usersArray');
//     return usersData ? JSON.parse(usersData) : [];
//   } catch (error) {
//     console.error('Error getting users array:', error);
//     return [];
//   }
// };

// const saveUserToArray = async userData => {
//   try {
//     const existingUsers = await getUsersArray();
//     const newUser = {
//       ...userData,
//       id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     const updatedUsers = [...existingUsers, newUser];
//     await AsyncStorage.setItem('usersArray', JSON.stringify(updatedUsers));
//     console.log('User saved to array:', newUser);
//     return newUser;
//   } catch (error) {
//     console.error('Error saving user to array:', error);
//     throw error;
//   }
// };

// // Utility function to get stored data (keeping your original function name)
// async function getLocalDataTime() {
//   try {
//     const data = await AsyncStorage.getItem('selectedData');
//     if (data !== null) {
//       const d = JSON.parse(data);
//       console.log('Retrieved data:', d);
//       return d;
//     }
//     return null;
//   } catch (error) {
//     console.log('Error reading route:', error);
//     return null;
//   }
// }

// const BusFormScreen = ({ navigation }) => {
//   // Bus basic information
//   const [busData, setBusData] = useState({
//     busName: '',
//     busNumber: '',
//     seatColumns: '',
//     seatRows: '',
//     notes: '',
//   });

//   // Schedules state - This is the main array that stores all schedules
//   const [schedules, setSchedules] = useState([]);
//   const [showScheduleModal, setShowScheduleModal] = useState(false);
//   const [editingSchedule, setEditingSchedule] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setBusErrors] = useState({});
//   const [currentUserData, setCurrentUserData] = useState(null);

//   // Schedule form state
//   const [scheduleForm, setScheduleForm] = useState({
//     startTime: '',
//     endTime: '',
//     startLocation: '',
//     endLocation: '',
//     fare: '',
//   });
//   const [scheduleErrors, setScheduleErrors] = useState({});

//   // Load user data on component mount
//   useEffect(() => {
//     loadUserData();
//   }, [loadUserData]);

//   // Function to load current user data
//   const loadUserData = useCallback(async  () => {
//     try {
//       const userData = await getLocalDataTime();
//       if (userData) {
//         setCurrentUserData(userData);
//         console.log('Loaded current user data:', userData);
//       } else {
//         Alert.alert('Error', 'No user data found. Please register again.', [
//           { text: 'OK', onPress: () => navigation.navigate('Register') },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error loading user data:', error);
//       Alert.alert('Error', 'Failed to load user data.');
//     }
//   }, [navigation]);

//   // Validation functions
//   const validateBusForm = () => {
//     const newErrors = {};

//     if (!busData.busName.trim()) {
//       newErrors.busName = 'Bus name is required';
//     }

//     if (!busData.busNumber.trim()) {
//       newErrors.busNumber = 'Bus number is required';
//     }

//     if (!busData.seatColumns.trim()) {
//       newErrors.seatColumns = 'Seat columns are required';
//     } else if (
//       isNaN(busData.seatColumns) ||
//       parseInt(busData.seatColumns) <= 0
//     ) {
//       newErrors.seatColumns = 'Please enter a valid number of columns';
//     }

//     if (!busData.seatRows.trim()) {
//       newErrors.seatRows = 'Seat rows are required';
//     } else if (isNaN(busData.seatRows) || parseInt(busData.seatRows) <= 0) {
//       newErrors.seatRows = 'Please enter a valid number of rows';
//     }

//     if (schedules.length === 0) {
//       newErrors.schedules = 'At least one schedule is required';
//     }

//     setBusErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateScheduleForm = () => {
//     const newErrors = {};

//     if (!scheduleForm.startLocation.trim()) {
//       newErrors.startLocation = 'Start location is required';
//     }

//     if (!scheduleForm.endLocation.trim()) {
//       newErrors.endLocation = 'End location is required';
//     }

//     if (!scheduleForm.startTime.trim()) {
//       newErrors.startTime = 'Start time is required';
//     } else if (!isValidTime(scheduleForm.startTime)) {
//       newErrors.startTime = 'Please enter valid time format (HH:MM)';
//     }

//     if (!scheduleForm.endTime.trim()) {
//       newErrors.endTime = 'End time is required';
//     } else if (!isValidTime(scheduleForm.endTime)) {
//       newErrors.endTime = 'Please enter valid time format (HH:MM)';
//     }

//     if (!scheduleForm.fare.trim()) {
//       newErrors.fare = 'Fare is required';
//     } else if (isNaN(scheduleForm.fare) || parseFloat(scheduleForm.fare) <= 0) {
//       newErrors.fare = 'Please enter a valid fare amount';
//     }

//     // Check if start time is before end time
//     if (
//       scheduleForm.startTime &&
//       scheduleForm.endTime &&
//       isValidTime(scheduleForm.startTime) &&
//       isValidTime(scheduleForm.endTime)
//     ) {
//       const startMinutes = timeToMinutes(scheduleForm.startTime);
//       const endMinutes = timeToMinutes(scheduleForm.endTime);

//       if (startMinutes >= endMinutes) {
//         newErrors.endTime = 'End time must be after start time';
//       }
//     }

//     // Check for duplicate routes
//     const isDuplicate = schedules.some(schedule => {
//       if (editingSchedule && schedule.id === editingSchedule) {
//         return false; // Skip the one being edited
//       }
//       return (
//         schedule.startLocation.toLowerCase() ===
//           scheduleForm.startLocation.toLowerCase() &&
//         schedule.endLocation.toLowerCase() ===
//           scheduleForm.endLocation.toLowerCase() &&
//         schedule.startTime === scheduleForm.startTime
//       );
//     });

//     if (isDuplicate) {
//       newErrors.startTime =
//         'A schedule with this route and time already exists';
//     }

//     setScheduleErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const isValidTime = time => {
//     const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     return timeRegex.test(time);
//   };

//   const timeToMinutes = time => {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const formatTimeInput = text => {
//     // Remove non-numeric characters
//     const cleaned = text.replace(/\D/g, '');

//     // Format as HH:MM
//     if (cleaned.length >= 3) {
//       return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
//     } else if (cleaned.length >= 1) {
//       return cleaned;
//     }
//     return '';
//   };

//   // Handle bus data changes
//   const updateBusData = (field, value) => {
//     setBusData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setBusErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   // Handle schedule form changes
//   const updateScheduleForm = (field, value) => {
//     if (field === 'startTime' || field === 'endTime') {
//       value = formatTimeInput(value);
//     }
//     setScheduleForm(prev => ({ ...prev, [field]: value }));
//     if (scheduleErrors[field]) {
//       setScheduleErrors(prev => ({ ...prev, [field]: '' }));
//     }
//   };

//   // Schedule management functions
//   const openScheduleModal = (schedule = null) => {
//     if (schedule) {
//       setScheduleForm({ ...schedule }); // Create a copy to avoid reference issues
//       setEditingSchedule(schedule.id);
//     } else {
//       setScheduleForm({
//         startTime: '',
//         endTime: '',
//         startLocation: '',
//         endLocation: '',
//         fare: '',
//       });
//       setEditingSchedule(null);
//     }
//     setScheduleErrors({});
//     setShowScheduleModal(true);
//   };

//   // Save schedule to array with proper ID generation
//   const saveSchedule = () => {
//     if (!validateScheduleForm()) {
//       return;
//     }

//     const scheduleId =
//       editingSchedule ||
//       `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//     const newSchedule = {
//       id: scheduleId,
//       startTime: scheduleForm.startTime.trim(),
//       endTime: scheduleForm.endTime.trim(),
//       startLocation: scheduleForm.startLocation.trim(),
//       endLocation: scheduleForm.endLocation.trim(),
//       fare: parseFloat(scheduleForm.fare).toFixed(2),
//       createdAt: editingSchedule
//         ? schedules.find(s => s.id === editingSchedule)?.createdAt
//         : new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     if (editingSchedule) {
//       // UPDATE: Replace existing schedule in array
//       setSchedules(prevSchedules => {
//         const updatedSchedules = prevSchedules.map(s =>
//           s.id === editingSchedule ? newSchedule : s,
//         );
//         console.log('Updated schedule in array:', newSchedule);
//         console.log('Full schedules array after update:', updatedSchedules);
//         return updatedSchedules;
//       });
//     } else {
//       // ADD: Add new schedule to array
//       setSchedules(prevSchedules => {
//         const updatedSchedules = [...prevSchedules, newSchedule];
//         console.log('Added new schedule to array:', newSchedule);
//         console.log('Full schedules array after addition:', updatedSchedules);
//         return updatedSchedules;
//       });
//     }

//     setShowScheduleModal(false);
//     setEditingSchedule(null);
//     resetScheduleForm();

//     // Clear schedules error if it exists
//     if (errors.schedules) {
//       setBusErrors(prev => ({ ...prev, schedules: '' }));
//     }

//     // Show success message
//     Alert.alert(
//       'Success',
//       `Schedule ${editingSchedule ? 'updated' : 'added'} successfully!`,
//       [{ text: 'OK' }],
//     );
//   };

//   // Delete schedule from array with confirmation
//   const deleteSchedule = scheduleId => {
//     const scheduleToDelete = schedules.find(s => s.id === scheduleId);

//     Alert.alert(
//       'Delete Schedule',
//       `Are you sure you want to delete the schedule from ${scheduleToDelete?.startLocation} to ${scheduleToDelete?.endLocation}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: () => {
//             // REMOVE: Filter out the deleted schedule
//             setSchedules(prevSchedules => {
//               const updatedSchedules = prevSchedules.filter(
//                 s => s.id !== scheduleId,
//               );
//               console.log('Deleted schedule with ID:', scheduleId);
//               console.log('Remaining schedules:', updatedSchedules);
//               return updatedSchedules;
//             });

//             Alert.alert('Deleted', 'Schedule deleted successfully!', [
//               { text: 'OK' },
//             ]);
//           },
//         },
//       ],
//     );
//   };

//   // Helper function to reset schedule form
//   const resetScheduleForm = () => {
//     setScheduleForm({
//       startTime: '',
//       endTime: '',
//       startLocation: '',
//       endLocation: '',
//       fare: '',
//     });
//     setScheduleErrors({});
//   };

//   // Clear all schedules with confirmation
//   const clearAllSchedules = () => {
//     Alert.alert(
//       'Clear All Schedules',
//       'Are you sure you want to remove all schedules? This action cannot be undone.',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Clear All',
//           style: 'destructive',
//           onPress: () => {
//             setSchedules([]);
//             console.log('All schedules cleared');
//             Alert.alert('Cleared', 'All schedules have been removed!');
//           },
//         },
//       ],
//     );
//   };

//   // Enhanced save function that adds user and bus data to users array
//   const saveBusData = async () => {
//     try {
//       setLoading(true);

//       if (!currentUserData) {
//         throw new Error('No user data found. Please register again.');
//       }

//       const totalSeats =
//         parseInt(busData.seatColumns) * parseInt(busData.seatRows);

//       const busPayload = {
//         name: busData.busName.trim(),
//         id: busData.busNumber.trim(),
//         seatDetails: {
//           left: parseInt(busData.seatColumns),
//           right: parseInt(busData.seatRows),
//           row: totalSeats,
//         },
//         schedules: schedules.map(schedule => ({
//           id: schedule.id,
//           startTime: schedule.startTime,
//           endTime: schedule.endTime,
//           route: {
//             startLocation: schedule.startLocation,
//             endLocation: schedule.endLocation,
//           },
//           fare: parseFloat(schedule.fare),
//           createdAt: schedule.createdAt,
//           updatedAt: schedule.updatedAt,
//         })),
//         notes: busData.notes.trim(),
//         createdAt: new Date().toISOString(),
//         bookings: [], // Initialize empty bookings array
//       };

//       // Prepare complete user data with bus information
//       const completeUserData = {
//         ...currentUserData,
//         bus: [busPayload], // Add bus data to user
//       };

//       console.log('Final bus data to save:', busPayload);
//       console.log('Complete user data with bus:', completeUserData);

//       // Save user with bus data to users array
//       await saveUserToArray(completeUserData);

//       // Clear temporary user data
//       await AsyncStorage.removeItem('selectedData');

//       Alert.alert(
//         'Success!',
//         `Account and bus "${busData.busName}" have been created successfully!`,
//         [
//           {
//             text: 'OK',
//             onPress: () => navigation.navigate('Login'),
//           },
//         ],
//       );
//     } catch (error) {
//       console.error('Save error:', error);
//       Alert.alert(
//         'Error',
//         error.message || 'Failed to save bus information. Please try again.',
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     if (!validateBusForm()) {
//       Alert.alert('Validation Error', 'Please fix the errors in the form.');
//       return;
//     }

//     const totalSchedules = schedules.length;
//     Alert.alert(
//       'Save Bus Information',
//       `Save bus details for "${
//         busData.busName
//       }" with ${totalSchedules} schedule${totalSchedules !== 1 ? 's' : ''}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Save', onPress: saveBusData },
//       ],
//     );
//   };

//   // Enhanced schedule item rendering with more details
//   const renderScheduleItem = ({ item, index }) => (
//     <View style={styles.scheduleItem}>
//       <View style={styles.scheduleHeader}>
//         <View style={styles.scheduleNumberBadge}>
//           <Text style={styles.scheduleNumberText}>{index + 1}</Text>
//         </View>
//         <Text style={styles.scheduleTitle}>
//           {item.startLocation} → {item.endLocation}
//         </Text>
//         <View style={styles.scheduleActions}>
//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={() => openScheduleModal(item)}
//           >
//             <Text style={styles.editButtonText}>Edit</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.deleteButton}
//             onPress={() => deleteSchedule(item.id)}
//           >
//             <Text style={styles.deleteButtonText}>Delete</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.scheduleDetails}>
//         <Text style={styles.scheduleTime}>
//           ⏰ {item.startTime} - {item.endTime}
//         </Text>
//         <Text style={styles.scheduleFare}>💰 Rs. {item.fare}</Text>
//         {item.updatedAt && (
//           <Text style={styles.scheduleUpdated}>
//             Last updated: {new Date(item.updatedAt).toLocaleString()}
//           </Text>
//         )}
//       </View>
//     </View>
//   );

//   const InputField = ({
//     placeholder,
//     value,
//     onChangeText,
//     error,
//     keyboardType = 'default',
//     autoCapitalize = 'sentences',
//     multiline = false,
//     numberOfLines = 1,
//     style = {},
//   }) => (
//     <View style={styles.inputWrapper}>
//       <TextInput
//         style={[
//           styles.input,
//           multiline && styles.multilineInput,
//           error && styles.inputError,
//           style,
//         ]}
//         placeholder={placeholder}
//         placeholderTextColor="#9CA3AF"
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         autoCapitalize={autoCapitalize}
//         multiline={multiline}
//         numberOfLines={numberOfLines}
//         textAlignVertical={multiline ? 'top' : 'center'}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.gradientBackground} />

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.contentCard}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <Text style={styles.title}>Bus Registration</Text>

//         {/* Show current user info */}
//         {currentUserData && (
//           <View style={styles.userInfoCard}>
//             <Text style={styles.userInfoText}>
//               Registering for: {currentUserData.name}
//             </Text>
//             <Text style={styles.userInfoSubtext}>{currentUserData.email}</Text>
//           </View>
//         )}

//         {/* Bus Information Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Bus Information</Text>

//           <InputField
//             placeholder="Bus Name"
//             value={busData.busName}
//             onChangeText={value => updateBusData('busName', value)}
//             error={errors.busName}
//             autoCapitalize="words"
//           />

//           <InputField
//             placeholder="Bus Number (e.g., ABC-1234)"
//             value={busData.busNumber}
//             onChangeText={value => updateBusData('busNumber', value)}
//             error={errors.busNumber}
//             autoCapitalize="characters"
//           />

//           <View style={styles.row}>
//             <View style={styles.halfWidth}>
//               <InputField
//                 placeholder="Seat Columns"
//                 value={busData.seatColumns}
//                 onChangeText={value => updateBusData('seatColumns', value)}
//                 error={errors.seatColumns}
//                 keyboardType="numeric"
//               />
//             </View>
//             <View style={styles.halfWidth}>
//               <InputField
//                 placeholder="Seat Rows"
//                 value={busData.seatRows}
//                 onChangeText={value => updateBusData('seatRows', value)}
//                 error={errors.seatRows}
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>

//           {busData.seatColumns && busData.seatRows && (
//             <Text style={styles.seatInfo}>
//               Total Seats:{' '}
//               {parseInt(busData.seatColumns || 0) *
//                 parseInt(busData.seatRows || 0)}
//             </Text>
//           )}

//           <InputField
//             placeholder="Additional Notes (Optional)"
//             value={busData.notes}
//             onChangeText={value => updateBusData('notes', value)}
//             multiline={true}
//             numberOfLines={3}
//           />
//         </View>

//         {/* Schedules Section */}
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <View>
//               <Text style={styles.sectionTitle}>
//                 Schedules ({schedules.length})
//               </Text>
//               {schedules.length > 0 && (
//                 <Text style={styles.sectionSubtitle}>
//                   {schedules.length} schedule{schedules.length !== 1 ? 's' : ''}{' '}
//                   added
//                 </Text>
//               )}
//             </View>
//             <View style={styles.scheduleHeaderActions}>
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => openScheduleModal()}
//               >
//                 <Text style={styles.addButtonText}>+ Add</Text>
//               </TouchableOpacity>
//               {schedules.length > 1 && (
//                 <TouchableOpacity
//                   style={styles.clearButton}
//                   onPress={clearAllSchedules}
//                 >
//                   <Text style={styles.clearButtonText}>Clear All</Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {errors.schedules ? (
//             <Text style={styles.errorText}>{errors.schedules}</Text>
//           ) : null}

//           {schedules.length > 0 ? (
//             <FlatList
//               data={schedules}
//               renderItem={renderScheduleItem}
//               keyExtractor={item => item.id}
//               scrollEnabled={false}
//               ItemSeparatorComponent={() => (
//                 <View style={styles.scheduleSeparator} />
//               )}
//             />
//           ) : (
//             <View style={styles.emptyScheduleContainer}>
//               <Text style={styles.emptyText}>No schedules added yet</Text>
//               <Text style={styles.emptySubtext}>
//                 Add your first schedule to get started
//               </Text>
//             </View>
//           )}
//         </View>

//         {/* Action Buttons */}
//         <View style={styles.actionButtons}>
//           <TouchableOpacity
//             style={[styles.saveButton, loading && styles.saveButtonDisabled]}
//             onPress={handleSave}
//             disabled={loading}
//             activeOpacity={0.8}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" size="small" />
//             ) : (
//               <Text style={styles.saveButtonText}>
//                 Complete Registration
//                 {schedules.length > 0 && ` (${schedules.length} schedules)`}
//               </Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => navigation.goBack()}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Schedule Modal */}
//       <Modal
//         visible={showScheduleModal}
//         animationType="slide"
//         presentationStyle="pageSheet"
//         onRequestClose={() => setShowScheduleModal(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>
//               {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
//             </Text>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowScheduleModal(false)}
//             >
//               <Text style={styles.closeButtonText}>×</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView
//             style={styles.modalContent}
//             keyboardShouldPersistTaps="handled"
//           >
//             <InputField
//               placeholder="Start Location (e.g., Colombo)"
//               value={scheduleForm.startLocation}
//               onChangeText={value => updateScheduleForm('startLocation', value)}
//               error={scheduleErrors.startLocation}
//               autoCapitalize="words"
//             />

//             <InputField
//               placeholder="End Location (e.g., Kandy)"
//               value={scheduleForm.endLocation}
//               onChangeText={value => updateScheduleForm('endLocation', value)}
//               error={scheduleErrors.endLocation}
//               autoCapitalize="words"
//             />

//             <View style={styles.row}>
//               <View style={styles.halfWidth}>
//                 <InputField
//                   placeholder="Start Time (HH:MM)"
//                   value={scheduleForm.startTime}
//                   onChangeText={value => updateScheduleForm('startTime', value)}
//                   error={scheduleErrors.startTime}
//                   keyboardType="numeric"
//                 />
//               </View>
//               <View style={styles.halfWidth}>
//                 <InputField
//                   placeholder="End Time (HH:MM)"
//                   value={scheduleForm.endTime}
//                   onChangeText={value => updateScheduleForm('endTime', value)}
//                   error={scheduleErrors.endTime}
//                   keyboardType="numeric"
//                 />
//               </View>
//             </View>

//             <InputField
//               placeholder="Fare Amount (Rs.)"
//               value={scheduleForm.fare}
//               onChangeText={value => updateScheduleForm('fare', value)}
//               error={scheduleErrors.fare}
//               keyboardType="decimal-pad"
//             />

//             <TouchableOpacity
//               style={styles.modalSaveButton}
//               onPress={saveSchedule}
//             >
//               <Text style={styles.modalSaveButtonText}>
//                 {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
//               </Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   gradientBackground: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: height * 0.3,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//   },
//   scrollView: {
//     flex: 1,
//     marginTop: height * 0.08,
//   },
//   contentCard: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     paddingHorizontal: 25,
//     paddingTop: 30,
//     paddingBottom: 50,
//     minHeight: height * 0.95,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -5 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1F2937',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   userInfoCard: {
//     backgroundColor: '#E0F2FE',
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 25,
//     borderWidth: 1,
//     borderColor: '#7DD3FC',
//   },
//   userInfoText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#0C4A6E',
//     textAlign: 'center',
//   },
//   userInfoSubtext: {
//     fontSize: 14,
//     color: '#0369A1',
//     textAlign: 'center',
//     marginTop: 2,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 2,
//   },
//   scheduleHeaderActions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   inputWrapper: {
//     marginBottom: 15,
//   },
//   input: {
//     height: 55,
//     borderColor: '#E5E7EB',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 20,
//     fontSize: 16,
//     backgroundColor: '#FAFAFA',
//     color: '#1F2937',
//   },
//   multilineInput: {
//     height: 100,
//     paddingTop: 15,
//   },
//   inputError: {
//     borderColor: '#EF4444',
//     borderWidth: 2,
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 12,
//     marginTop: 5,
//     marginLeft: 5,
//   },
//   row: {
//     flexDirection: 'row',
//     gap: 15,
//   },
//   halfWidth: {
//     flex: 1,
//   },
//   seatInfo: {
//     fontSize: 14,
//     color: '#059669',
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 15,
//     backgroundColor: '#ECFDF5',
//     padding: 10,
//     borderRadius: 8,
//   },
//   addButton: {
//     backgroundColor: '#3B82F6',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   clearButton: {
//     backgroundColor: '#EF4444',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   clearButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   emptyScheduleContainer: {
//     paddingVertical: 30,
//     alignItems: 'center',
//   },
//   emptyText: {
//     textAlign: 'center',
//     color: '#6B7280',
//     fontSize: 16,
//     fontStyle: 'italic',
//   },
//   emptySubtext: {
//     textAlign: 'center',
//     color: '#9CA3AF',
//     fontSize: 14,
//     marginTop: 5,
//   },
//   scheduleItem: {
//     backgroundColor: '#F9FAFB',
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   scheduleNumberBadge: {
//     backgroundColor: '#3B82F6',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   scheduleNumberText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   scheduleTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1F2937',
//     flex: 1,
//   },
//   scheduleActions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   editButton: {
//     backgroundColor: '#3B82F6',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   deleteButton: {
//     backgroundColor: '#EF4444',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//   },
//   deleteButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   scheduleDetails: {
//     gap: 5,
//   },
//   scheduleTime: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   scheduleFare: {
//     fontSize: 14,
//     color: '#059669',
//     fontWeight: '600',
//   },
//   scheduleUpdated: {
//     fontSize: 12,
//     color: '#9CA3AF',
//   },
//   scheduleSeparator: {
//     height: 8,
//   },
//   actionButtons: {
//     gap: 15,
//   },
//   saveButton: {
//     backgroundColor: '#1F2937',
//     paddingVertical: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#1F2937',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//   },
//   saveButtonDisabled: {
//     backgroundColor: '#9CA3AF',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   cancelButton: {
//     paddingVertical: 15,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     color: '#6B7280',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   // Modal styles
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1F2937',
//   },
//   closeButton: {
//     padding: 5,
//   },
//   closeButtonText: {
//     fontSize: 24,
//     color: '#6B7280',
//   },
//   modalContent: {
//     flex: 1,
//     padding: 20,
//   },
//   modalSaveButton: {
//     backgroundColor: '#3B82F6',
//     paddingVertical: 15,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   modalSaveButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default BusFormScreen;

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Move InputField component outside of BusFormScreen
const InputField = ({
  placeholder,
  value,
  onChangeText,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  style = {},
}) => (
  <View style={styles.inputWrapper}>
    <TextInput
      style={[
        styles.input,
        multiline && styles.multilineInput,
        error && styles.inputError,
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

// Utility functions for data management
const getUsersArray = async () => {
  try {
    const usersData = await AsyncStorage.getItem('usersArray');
    return usersData ? JSON.parse(usersData) : [];
  } catch (error) {
    console.error('Error getting users array:', error);
    return [];
  }
};

const saveUserToArray = async userData => {
  try {
    const existingUsers = await getUsersArray();
    const newUser = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedUsers = [...existingUsers, newUser];
    await AsyncStorage.setItem('usersArray', JSON.stringify(updatedUsers));
    console.log('User saved to array:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error saving user to array:', error);
    throw error;
  }
};

// Utility function to get stored data (keeping your original function name)
async function getLocalDataTime() {
  try {
    const data = await AsyncStorage.getItem('selectedData');
    if (data !== null) {
      const d = JSON.parse(data);
      console.log('Retrieved data:', d);
      return d;
    }
    return null;
  } catch (error) {
    console.log('Error reading route:', error);
    return null;
  }
}

const BusFormScreen = ({ navigation }) => {
  // Bus basic information
  const [busData, setBusData] = useState({
    busName: '',
    busNumber: '',
    seatColumns: '',
    seatRows: '',
    notes: '',
  });

  // Schedules state - This is the main array that stores all schedules
  const [schedules, setSchedules] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setBusErrors] = useState({});
  const [currentUserData, setCurrentUserData] = useState(null);

  // Schedule form state
  const [scheduleForm, setScheduleForm] = useState({
    startTime: '',
    endTime: '',
    startLocation: '',
    endLocation: '',
    fare: '',
  });
  const [scheduleErrors, setScheduleErrors] = useState({});

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Function to load current user data
  const loadUserData = useCallback(async () => {
    try {
      const userData = await getLocalDataTime();
      if (userData) {
        setCurrentUserData(userData);
        console.log('Loaded current user data:', userData);
      } else {
        Alert.alert('Error', 'No user data found. Please register again.', [
          { text: 'OK', onPress: () => navigation.navigate('Register') },
        ]);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data.');
    }
  }, [navigation]);

  // Validation functions
  const validateBusForm = () => {
    const newErrors = {};

    if (!busData.busName.trim()) {
      newErrors.busName = 'Bus name is required';
    }

    if (!busData.busNumber.trim()) {
      newErrors.busNumber = 'Bus number is required';
    }

    if (!busData.seatColumns.trim()) {
      newErrors.seatColumns = 'Seat columns are required';
    } else if (
      isNaN(busData.seatColumns) ||
      parseInt(busData.seatColumns) <= 0
    ) {
      newErrors.seatColumns = 'Please enter a valid number of columns';
    }

    if (!busData.seatRows.trim()) {
      newErrors.seatRows = 'Seat rows are required';
    } else if (isNaN(busData.seatRows) || parseInt(busData.seatRows) <= 0) {
      newErrors.seatRows = 'Please enter a valid number of rows';
    }

    if (schedules.length === 0) {
      newErrors.schedules = 'At least one schedule is required';
    }

    setBusErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateScheduleForm = () => {
    const newErrors = {};

    if (!scheduleForm.startLocation.trim()) {
      newErrors.startLocation = 'Start location is required';
    }

    if (!scheduleForm.endLocation.trim()) {
      newErrors.endLocation = 'End location is required';
    }

    if (!scheduleForm.startTime.trim()) {
      newErrors.startTime = 'Start time is required';
    } else if (!isValidTime(scheduleForm.startTime)) {
      newErrors.startTime = 'Please enter valid time format (HH:MM)';
    }

    if (!scheduleForm.endTime.trim()) {
      newErrors.endTime = 'End time is required';
    } else if (!isValidTime(scheduleForm.endTime)) {
      newErrors.endTime = 'Please enter valid time format (HH:MM)';
    }

    if (!scheduleForm.fare.trim()) {
      newErrors.fare = 'Fare is required';
    } else if (isNaN(scheduleForm.fare) || parseFloat(scheduleForm.fare) <= 0) {
      newErrors.fare = 'Please enter a valid fare amount';
    }

    // Check if start time is before end time
    if (
      scheduleForm.startTime &&
      scheduleForm.endTime &&
      isValidTime(scheduleForm.startTime) &&
      isValidTime(scheduleForm.endTime)
    ) {
      const startMinutes = timeToMinutes(scheduleForm.startTime);
      const endMinutes = timeToMinutes(scheduleForm.endTime);

      if (startMinutes >= endMinutes) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    // Check for duplicate routes
    const isDuplicate = schedules.some(schedule => {
      if (editingSchedule && schedule.id === editingSchedule) {
        return false; // Skip the one being edited
      }
      return (
        schedule.startLocation.toLowerCase() ===
          scheduleForm.startLocation.toLowerCase() &&
        schedule.endLocation.toLowerCase() ===
          scheduleForm.endLocation.toLowerCase() &&
        schedule.startTime === scheduleForm.startTime
      );
    });

    if (isDuplicate) {
      newErrors.startTime =
        'A schedule with this route and time already exists';
    }

    setScheduleErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidTime = time => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const timeToMinutes = time => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const formatTimeInput = text => {
    // Remove non-numeric characters
    const cleaned = text.replace(/\D/g, '');

    // Format as HH:MM
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    } else if (cleaned.length >= 1) {
      return cleaned;
    }
    return '';
  };

  // Handle bus data changes
  const updateBusData = (field, value) => {
    setBusData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setBusErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle schedule form changes
  const updateScheduleForm = (field, value) => {
    if (field === 'startTime' || field === 'endTime') {
      value = formatTimeInput(value);
    }
    setScheduleForm(prev => ({ ...prev, [field]: value }));
    if (scheduleErrors[field]) {
      setScheduleErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Schedule management functions
  const openScheduleModal = (schedule = null) => {
    if (schedule) {
      setScheduleForm({ ...schedule }); // Create a copy to avoid reference issues
      setEditingSchedule(schedule.id);
    } else {
      setScheduleForm({
        startTime: '',
        endTime: '',
        startLocation: '',
        endLocation: '',
        fare: '',
      });
      setEditingSchedule(null);
    }
    setScheduleErrors({});
    setShowScheduleModal(true);
  };

  // Save schedule to array with proper ID generation
  const saveSchedule = () => {
    if (!validateScheduleForm()) {
      return;
    }

    const scheduleId =
      editingSchedule ||
      `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newSchedule = {
      id: scheduleId,
      startTime: scheduleForm.startTime.trim(),
      endTime: scheduleForm.endTime.trim(),
      startLocation: scheduleForm.startLocation.trim(),
      endLocation: scheduleForm.endLocation.trim(),
      fare: parseFloat(scheduleForm.fare).toFixed(2),
      createdAt: editingSchedule
        ? schedules.find(s => s.id === editingSchedule)?.createdAt
        : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingSchedule) {
      // UPDATE: Replace existing schedule in array
      setSchedules(prevSchedules => {
        const updatedSchedules = prevSchedules.map(s =>
          s.id === editingSchedule ? newSchedule : s,
        );
        console.log('Updated schedule in array:', newSchedule);
        console.log('Full schedules array after update:', updatedSchedules);
        return updatedSchedules;
      });
    } else {
      // ADD: Add new schedule to array
      setSchedules(prevSchedules => {
        const updatedSchedules = [...prevSchedules, newSchedule];
        console.log('Added new schedule to array:', newSchedule);
        console.log('Full schedules array after addition:', updatedSchedules);
        return updatedSchedules;
      });
    }

    setShowScheduleModal(false);
    setEditingSchedule(null);
    resetScheduleForm();

    // Clear schedules error if it exists
    if (errors.schedules) {
      setBusErrors(prev => ({ ...prev, schedules: '' }));
    }

    // Show success message
    Alert.alert(
      'Success',
      `Schedule ${editingSchedule ? 'updated' : 'added'} successfully!`,
      [{ text: 'OK' }],
    );
  };

  // Delete schedule from array with confirmation
  const deleteSchedule = scheduleId => {
    const scheduleToDelete = schedules.find(s => s.id === scheduleId);

    Alert.alert(
      'Delete Schedule',
      `Are you sure you want to delete the schedule from ${scheduleToDelete?.startLocation} to ${scheduleToDelete?.endLocation}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // REMOVE: Filter out the deleted schedule
            setSchedules(prevSchedules => {
              const updatedSchedules = prevSchedules.filter(
                s => s.id !== scheduleId,
              );
              console.log('Deleted schedule with ID:', scheduleId);
              console.log('Remaining schedules:', updatedSchedules);
              return updatedSchedules;
            });

            Alert.alert('Deleted', 'Schedule deleted successfully!', [
              { text: 'OK' },
            ]);
          },
        },
      ],
    );
  };

  // Helper function to reset schedule form
  const resetScheduleForm = () => {
    setScheduleForm({
      startTime: '',
      endTime: '',
      startLocation: '',
      endLocation: '',
      fare: '',
    });
    setScheduleErrors({});
  };

  // Clear all schedules with confirmation
  const clearAllSchedules = () => {
    Alert.alert(
      'Clear All Schedules',
      'Are you sure you want to remove all schedules? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            setSchedules([]);
            console.log('All schedules cleared');
            Alert.alert('Cleared', 'All schedules have been removed!');
          },
        },
      ],
    );
  };

  // Enhanced save function that adds user and bus data to users array
  const saveBusData = async () => {
    try {
      setLoading(true);

      if (!currentUserData) {
        throw new Error('No user data found. Please register again.');
      }

      const totalSeats =
        parseInt(busData.seatColumns) * parseInt(busData.seatRows);

      const busPayload = {
        name: busData.busName.trim(),
        id: busData.busNumber.trim(),
        driver: '',
        seatDetails: {
          left: parseInt(busData.seatColumns),
          right: parseInt(busData.seatRows),
          row: totalSeats,
        },
        schedules: schedules.map(schedule => ({
          id: schedule.id,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          route: {
            startLocation: schedule.startLocation,
            endLocation: schedule.endLocation,
          },
          fare: parseFloat(schedule.fare),
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
        })),
        notes: busData.notes.trim(),
        createdAt: new Date().toISOString(),
        bookings: [], // Initialize empty bookings array
      };

      // Prepare complete user data with bus information
      const completeUserData = {
        ...currentUserData,
        bus: [busPayload], // Add bus data to user
      };

      console.log('Final bus data to save:', busPayload);
      console.log('Complete user data with bus:', completeUserData);

      // Save user with bus data to users array
      await saveUserToArray(completeUserData);

      // Clear temporary user data
      await AsyncStorage.removeItem('selectedData');

      Alert.alert(
        'Success!',
        `Account and bus "${busData.busName}" have been created successfully!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to save bus information. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!validateBusForm()) {
      Alert.alert('Validation Error', 'Please fix the errors in the form.');
      return;
    }

    const totalSchedules = schedules.length;
    Alert.alert(
      'Save Bus Information',
      `Save bus details for "${
        busData.busName
      }" with ${totalSchedules} schedule${totalSchedules !== 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: saveBusData },
      ],
    );
  };

  // Enhanced schedule item rendering with more details
  const renderScheduleItem = ({ item, index }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.scheduleHeader}>
        <View style={styles.scheduleNumberBadge}>
          <Text style={styles.scheduleNumberText}>{index + 1}</Text>
        </View>
        <Text style={styles.scheduleTitle}>
          {item.startLocation} → {item.endLocation}
        </Text>
        <View style={styles.scheduleActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => openScheduleModal(item)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteSchedule(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scheduleDetails}>
        <Text style={styles.scheduleTime}>
          ⏰ {item.startTime} - {item.endTime}
        </Text>
        <Text style={styles.scheduleFare}>💰 Rs. {item.fare}</Text>
        {item.updatedAt && (
          <Text style={styles.scheduleUpdated}>
            Last updated: {new Date(item.updatedAt).toLocaleString()}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentCard}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Bus Registration</Text>

        {/* Show current user info */}
        {currentUserData && (
          <View style={styles.userInfoCard}>
            <Text style={styles.userInfoText}>
              Registering for: {currentUserData.name}
            </Text>
            <Text style={styles.userInfoSubtext}>{currentUserData.email}</Text>
          </View>
        )}

        {/* Bus Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bus Information</Text>

          <InputField
            placeholder="Bus Name"
            value={busData.busName}
            onChangeText={value => updateBusData('busName', value)}
            error={errors.busName}
            autoCapitalize="words"
          />

          <InputField
            placeholder="Bus Number (e.g., ABC-1234)"
            value={busData.busNumber}
            onChangeText={value => updateBusData('busNumber', value)}
            error={errors.busNumber}
            autoCapitalize="characters"
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                placeholder="Seat Columns"
                value={busData.seatColumns}
                onChangeText={value => updateBusData('seatColumns', value)}
                error={errors.seatColumns}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                placeholder="Seat Rows"
                value={busData.seatRows}
                onChangeText={value => updateBusData('seatRows', value)}
                error={errors.seatRows}
                keyboardType="numeric"
              />
            </View>
          </View>

          {busData.seatColumns && busData.seatRows && (
            <Text style={styles.seatInfo}>
              Total Seats:{' '}
              {parseInt(busData.seatColumns || 0) *
                parseInt(busData.seatRows || 0)}
            </Text>
          )}

          <InputField
            placeholder="Additional Notes (Optional)"
            value={busData.notes}
            onChangeText={value => updateBusData('notes', value)}
            multiline={true}
            numberOfLines={3}
          />
        </View>

        {/* Schedules Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Schedules ({schedules.length})
              </Text>
              {schedules.length > 0 && (
                <Text style={styles.sectionSubtitle}>
                  {schedules.length} schedule{schedules.length !== 1 ? 's' : ''}{' '}
                  added
                </Text>
              )}
            </View>
            <View style={styles.scheduleHeaderActions}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openScheduleModal()}
              >
                <Text style={styles.addButtonText}>+ Add</Text>
              </TouchableOpacity>
              {schedules.length > 1 && (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearAllSchedules}
                >
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {errors.schedules ? (
            <Text style={styles.errorText}>{errors.schedules}</Text>
          ) : null}

          {schedules.length > 0 ? (
            <FlatList
              data={schedules}
              renderItem={renderScheduleItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.scheduleSeparator} />
              )}
            />
          ) : (
            <View style={styles.emptyScheduleContainer}>
              <Text style={styles.emptyText}>No schedules added yet</Text>
              <Text style={styles.emptySubtext}>
                Add your first schedule to get started
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>
                Complete Registration
                {schedules.length > 0 && ` (${schedules.length} schedules)`}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Schedule Modal */}
      <Modal
        visible={showScheduleModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowScheduleModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowScheduleModal(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            keyboardShouldPersistTaps="handled"
          >
            <InputField
              placeholder="Start Location (e.g., Colombo)"
              value={scheduleForm.startLocation}
              onChangeText={value => updateScheduleForm('startLocation', value)}
              error={scheduleErrors.startLocation}
              autoCapitalize="words"
            />

            <InputField
              placeholder="End Location (e.g., Kandy)"
              value={scheduleForm.endLocation}
              onChangeText={value => updateScheduleForm('endLocation', value)}
              error={scheduleErrors.endLocation}
              autoCapitalize="words"
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField
                  placeholder="Start Time (HH:MM)"
                  value={scheduleForm.startTime}
                  onChangeText={value => updateScheduleForm('startTime', value)}
                  error={scheduleErrors.startTime}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  placeholder="End Time (HH:MM)"
                  value={scheduleForm.endTime}
                  onChangeText={value => updateScheduleForm('endTime', value)}
                  error={scheduleErrors.endTime}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <InputField
              placeholder="Fare Amount (Rs.)"
              value={scheduleForm.fare}
              onChangeText={value => updateScheduleForm('fare', value)}
              error={scheduleErrors.fare}
              keyboardType="decimal-pad"
            />

            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={saveSchedule}
            >
              <Text style={styles.modalSaveButtonText}>
                {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

// ... rest of the styles remain exactly the same ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  scrollView: {
    flex: 1,
    marginTop: height * 0.08,
  },
  contentCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 50,
    minHeight: height * 0.95,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfoCard: {
    backgroundColor: '#E0F2FE',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#7DD3FC',
  },
  userInfoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0C4A6E',
    textAlign: 'center',
  },
  userInfoSubtext: {
    fontSize: 14,
    color: '#0369A1',
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  scheduleHeaderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    height: 55,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    color: '#1F2937',
  },
  multilineInput: {
    height: 100,
    paddingTop: 15,
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  seatInfo: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#ECFDF5',
    padding: 10,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyScheduleContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 16,
    fontStyle: 'italic',
  },
  emptySubtext: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 5,
  },
  scheduleItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scheduleNumberBadge: {
    backgroundColor: '#3B82F6',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  scheduleNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  scheduleActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  scheduleDetails: {
    gap: 5,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  scheduleFare: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  scheduleUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  scheduleSeparator: {
    height: 8,
  },
  actionButtons: {
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#1F2937',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#1F2937',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cancelButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6B7280',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSaveButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  modalSaveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BusFormScreen;
