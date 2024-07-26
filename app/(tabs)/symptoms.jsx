import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import { db } from '../../config/firebase'; // Adjust the import according to your file structure
import { collection, addDoc } from 'firebase/firestore';

const Symptoms = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [symptom, setSymptom] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [bloodTestDone, setBloodTestDone] = useState(false);
  const [testName, setTestName] = useState('');
  const [marker, setMarker] = useState('');
  const [markers, setMarkers] = useState([]);

  const handleAddSymptom = () => {
    if (symptom.trim()) {
      setSymptoms([...symptoms, symptom.trim()]);
      setSymptom('');
    }
  };

  const handleAddMarker = () => {
    if (marker.trim()) {
      setMarkers([...markers, marker.trim()]);
      setMarker('');
    }
  };

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
    <SafeAreaView className="bg-primary flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
          <View className="bg-secondary rounded-lg p-6">
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
            <View className="mt-6">
              <Text className="text-lg text-white font-pregular">Symptom</Text>
              <TextInput
                className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
                placeholder="Enter symptom"
                placeholderTextColor="#CDCDE0"
                value={symptom}
                onChangeText={setSymptom}
                onSubmitEditing={handleAddSymptom}
                returnKeyType="done"
              />
            </View>
            <CustomButton
              title="Add Symptom"
              handlePress={handleAddSymptom}
              containerStyles="mt-6"
            />
            {symptoms.length > 0 ? (
              <FlatList
                data={symptoms}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View className="p-4 border-b border-gray-100 mt-6">
                    <Text className="text-lg text-white font-pregular">{item}</Text>
                  </View>
                )}
              />
            ) : (
              <Text className="text-lg text-white font-pregular mt-6">No symptoms recorded yet.</Text>
            )}
            <View className="mt-6">
              <Text className="text-lg text-white font-pregular">Blood Test Done?</Text>
              <Button title={bloodTestDone ? "No" : "Yes"} onPress={() => setBloodTestDone(!bloodTestDone)} />
              {bloodTestDone && (
                <View className="mt-6">
                  <Text className="text-lg text-white font-pregular">Test Name</Text>
                  <TextInput
                    className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
                    placeholder="Enter test name"
                    placeholderTextColor="#CDCDE0"
                    value={testName}
                    onChangeText={setTestName}
                    returnKeyType="done"
                  />
                  <Text className="text-lg text-white font-pregular mt-6">Marker</Text>
                  <TextInput
                    className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
                    placeholder="Enter marker"
                    placeholderTextColor="#CDCDE0"
                    value={marker}
                    onChangeText={setMarker}
                    onSubmitEditing={handleAddMarker}
                    returnKeyType="done"
                  />
                  <CustomButton
                    title="Add Marker"
                    handlePress={handleAddMarker}
                    containerStyles="mt-6"
                  />
                  {markers.length > 0 && (
                    <FlatList
                      data={markers}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <View className="p-4 border-b border-gray-100 mt-6">
                          <Text className="text-lg text-white font-pregular">{item}</Text>
                        </View>
                      )}
                    />
                  )}
                </View>
              )}
            </View>
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
