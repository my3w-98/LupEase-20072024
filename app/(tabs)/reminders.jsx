import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

const Reminders = () => {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        <View className="bg-secondary rounded-lg p-6">
          <Text className="text-2xl text-white font-psemibold">Reminders</Text>
          <Calendar
            // Mark dates with reminders
            markedDates={{
              '2024-07-22': { marked: true, dotColor: 'red' },
              '2024-07-23': { marked: true, dotColor: 'red' },
            }}
            theme={{
              calendarBackground: '#161622',
              textSectionTitleColor: '#CDCDE0',
              dayTextColor: '#CDCDE0',
              todayTextColor: '#8C52FF',
              selectedDayTextColor: '#ffffff',
              monthTextColor: '#CDCDE0',
              indicatorColor: '#8C52FF',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reminders;
