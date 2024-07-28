import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Platform, Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import { db } from '../../config/firebase'; // Correctly import the Firebase configuration file
import { collection, addDoc, Timestamp, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions

const Medication = () => {
  const [medication, setMedication] = useState('');
  const [dose, setDose] = useState('');
  const [reminder, setReminder] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      const querySnapshot = await getDocs(collection(db, 'medications'));
      const meds = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMedications(meds);
    };

    fetchMedications();
  }, []);

  const handleSave = async () => {
    if (!medication.trim() || !dose.trim()) {
      Alert.alert('Error', 'Medication name and dose cannot be empty');
      return;
    }

    const duplicate = medications.find(med => med.medication.toLowerCase() === medication.toLowerCase());

    if (duplicate) {
      Alert.alert('Error', 'This medication already exists');
      return;
    }

    try {
      const newDoc = await addDoc(collection(db, 'medications'), {
        medication,
        dose,
        reminder: Timestamp.fromDate(reminder),
      });
      setMedications([...medications, { medication, dose, reminder, id: newDoc.id }]);
      Alert.alert('Success', 'Medication saved successfully');
      // Clear the inputs
      setMedication('');
      setDose('');
      setReminder(new Date());
    } catch (error) {
      Alert.alert('Error', 'Failed to save medication');
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this medication?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'medications', id));
              setMedications(medications.filter(med => med.id !== id));
              Alert.alert('Deleted', 'Medication deleted successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete medication');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || reminder;
    setShowDatePicker(Platform.OS === 'ios');
    setReminder(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || reminder;
    setShowTimePicker(Platform.OS === 'ios');
    setReminder(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const renderMedication = ({ item }) => (
    <View className="bg-customColors-color1 rounded-lg p-4 mb-4 flex-row justify-between items-center">
      <View>
        <Text className="text-lg text-white font-psemibold">{item.medication}</Text>
        <Text className="text-md text-white font-pregular">{`Dose: ${item.dose}`}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} className="bg-red-500 p-2 rounded-lg">
        <Text className="text-white">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="bg-primarytabs flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        <View className="bg-customColors-color1 rounded-lg p-6 mb-6">
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
            <TouchableOpacity onPress={showDatepicker} className="border border-gray-100 rounded-md p-3 mt-2 bg-black-200">
              <Text className="text-white">{`Date: ${reminder.toLocaleDateString()}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showTimepicker} className="border border-gray-100 rounded-md p-3 mt-2 bg-black-200">
              <Text className="text-white">{`Time: ${reminder.toLocaleTimeString()}`}</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={reminder}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          {showTimePicker && (
            <DateTimePicker
              value={reminder}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
          <CustomButton
            title="Save"
            handlePress={handleSave}
            containerStyles="mt-6 bg-success"
          />
        </View>

        <FlatList
          data={medications}
          renderItem={renderMedication}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Medication;
