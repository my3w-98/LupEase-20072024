import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';

const Medication = () => {
  const [medication, setMedication] = useState('');
  const [dose, setDose] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSave = () => {
    // Save medication details to Firebase
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        <View className="bg-secondary rounded-lg p-6">
          <Text className="text-2xl text-white font-psemibold">Add Medication</Text>
          <View className="mt-6">
            <Text className="text-lg text-white font-pregular">Medication Name</Text>
            <TextInput
              className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
              placeholder="Enter medication name"
              placeholderTextColor="#CDCDE0"
              value={medication}
              onChangeText={setMedication}
            />
          </View>
          <View className="mt-6">
            <Text className="text-lg text-white font-pregular">Dose</Text>
            <TextInput
              className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
              placeholder="Enter dose"
              placeholderTextColor="#CDCDE0"
              value={dose}
              onChangeText={setDose}
            />
          </View>
          <View className="mt-6">
            <Text className="text-lg text-white font-pregular">Reminder</Text>
            <TextInput
              className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
              placeholder="Set reminder"
              placeholderTextColor="#CDCDE0"
              value={reminder}
              onChangeText={setReminder}
            />
          </View>
          <CustomButton
            title="Save"
            handlePress={handleSave}
            containerStyles="mt-6"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Medication;
