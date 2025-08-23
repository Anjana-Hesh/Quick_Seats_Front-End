import { View, Text, StyleSheet } from 'react-native';

export function Message({ message, time }) {
  return (
    <View style={styles.messageView}>
      <View style={styles.message}>
        <Text>{message}</Text>
      </View>
      <View style={styles.time}>
        <Text>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageView: {
    display: 'flex',
    flexDirection: 'column', // arrange vertically
    marginBottom: 8,
  },
  message: {
    width: 200,
    backgroundColor: '#e5e5ea',
    padding: 8,
    borderRadius: 10,
  },
  time: {
    width: 200,
    alignItems: 'flex-end', // aligns time to the right
    marginTop: 2,
  },
});
