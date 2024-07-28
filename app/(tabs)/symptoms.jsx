// Symptoms.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import SymptomsEntry from '../services/symptomsEntry';
import BloodTestEntry from '../services/bloodTestEntry';
import CustomButton from '../../components/CustomButton';
import { db } from '../../config/firebase'; // Adjust the import according to your file structure
import { collection, addDoc } from 'firebase/firestore';

const Symptoms = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [bloodTestDone, setBloodTestDone] = useState(false);
  const [testName, setTestName] = useState('');
  const [markers, setMarkers] = useState([]);

  const handleSave = async () => {
    try {
      const data = {
        date,
        symptoms,
        bloodTestDone,
        testName,
        markers,
      };
      await addDoc(collection(db, 'symptoms'), data);
      setDate(new Date());
      setSymptoms([]);
      setBloodTestDone(false);
      setTestName('');
      setMarkers([]);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  return (
    <SafeAreaView className="bg-primarytabs flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
          <View className="bg-secondary rounded-lg p-6 mb-6">
            <Text className="text-2xl text-white font-psemibold">Record Symptoms</Text>
            <View className="mt-6">
              <Text className="text-lg text-white font-pregular">Select Date</Text>
              <Button onPress={() => setShowDatePicker(true)} title="Show date picker" />
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          </View>

          <View className="bg-secondary rounded-lg p-6 mb-6">
            <Text className="text-xl text-white font-psemibold">Symptoms</Text>
            <SymptomsEntry symptoms={symptoms} setSymptoms={setSymptoms} />
          </View>

          

          <View className="bg-secondary rounded-lg p-6">
            <CustomButton
              title="Save"
              handlePress={handleSave}
              containerStyles="mt-6"
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Symptoms;
