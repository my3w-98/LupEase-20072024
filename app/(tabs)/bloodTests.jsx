import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import BloodTestEntry from '../services/bloodTestEntry';
import { Button } from 'react-native-elements'; // Importing Button from react-native-elements

import { db } from '../../config/firebase'; // Adjust the import according to your file structure
import { collection, addDoc } from 'firebase/firestore';

const BloodTests = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bloodTestDone, setBloodTestDone] = useState(false);
  const [testName, setTestName] = useState('');
  const [markers, setMarkers] = useState([]);

  const handleSave = async () => {
    try {
      if (bloodTestDone) {
        const bloodTestData = {
          date,
          testName,
          markers,
        };
        await addDoc(collection(db, 'bloodTests'), bloodTestData);
      }

      setDate(new Date());
      setBloodTestDone(false);
      setTestName('');
      setMarkers([]);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const renderHeader = () => (
    <>
      <View className="bg-custom-color1  rounded-lg p-6 mb-6">
        <Text className="text-2xl text-white font-psemibold">Record Blood Tests</Text>
        <View className="mt-6">
          <Text className="text-lg text-white font-pregular">Selected Date: {date.toLocaleDateString()}</Text>
          <Button onPress={() => setShowDatePicker(true)} title="Change date" />
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

      <View className="bg-custom-color1  rounded-lg p-6 mb-6">
        <BloodTestEntry
          bloodTestDone={bloodTestDone}
          setBloodTestDone={setBloodTestDone}
          testName={testName}
          setTestName={setTestName}
          markers={markers}
          setMarkers={setMarkers}
        />
      </View>
    </>
  );

  const renderFooter = () => (
    <>
      <View className="bg-custom-color1  rounded-lg p-6 mb-6">
        <Button
          title="Save"
          onPress={handleSave}
          buttonStyle={{ backgroundColor: '#5A639C', paddingVertical: 10 }} // Adjust the button styles here
          containerStyle={{ marginTop: 10 }}
        />
      </View>

      
    </>
  );

  return (
    <SafeAreaView className="bg-primarytabs flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={[]}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BloodTests;
