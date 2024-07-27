import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import CustomButton from '../../components/CustomButton';

const SymptomsEntry = ({ symptoms, setSymptoms }) => {
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState(1);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddSymptom = () => {
    if (symptom.trim()) {
      if (editIndex !== null) {
        const updatedSymptoms = [...symptoms];
        updatedSymptoms[editIndex] = { symptom: symptom.trim(), severity };
        setSymptoms(updatedSymptoms);
        setEditIndex(null);
      } else {
        setSymptoms([...symptoms, { symptom: symptom.trim(), severity }]);
      }
      setSymptom('');
      setSeverity(1);
    }
  };

  const handleEditSymptom = (index) => {
    setSymptom(symptoms[index].symptom);
    setSeverity(symptoms[index].severity);
    setEditIndex(index);
  };

  const handleDeleteSymptom = (index) => {
    const updatedSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(updatedSymptoms);
  };

  return (
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
      <Text className="text-lg text-white font-pregular mt-4">Severity</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={severity}
        onValueChange={setSeverity}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
      <Text className="text-lg text-white font-pregular">Value: {severity}</Text>
      <CustomButton
        title={editIndex !== null ? "Update Symptom" : "Add Symptom"}
        handlePress={handleAddSymptom}
        containerStyles="mt-6"
      />
      {symptoms.length > 0 && (
        <FlatList
          data={symptoms}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="p-4 border-b border-gray-100 mt-6 flex-row justify-between items-center">
              <View>
                <Text className="text-lg text-white font-pregular">{item.symptom} - Severity: {item.severity}</Text>
              </View>
              <View className="flex-row">
                <TouchableOpacity onPress={() => handleEditSymptom(index)} style={{ marginRight: 10 }}>
                  <Text className="text-blue-500">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteSymptom(index)}>
                  <Text className="text-red-500">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SymptomsEntry;
