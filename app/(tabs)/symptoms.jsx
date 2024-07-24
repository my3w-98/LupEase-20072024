import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';

const Symptoms = () => {
  const [symptom, setSymptom] = useState('');
  const [symptoms, setSymptoms] = useState([]);

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, symptom]);
    setSymptom('');
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        <View className="bg-secondary rounded-lg p-6">
          <Text className="text-2xl text-white font-psemibold">Record Symptoms</Text>
          <View className="mt-6">
            <Text className="text-lg text-white font-pregular">Symptom</Text>
            <TextInput
              className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
              placeholder="Enter symptom"
              placeholderTextColor="#CDCDE0"
              value={symptom}
              onChangeText={setSymptom}
            />
          </View>
          <CustomButton
            title="Add Symptom"
            handlePress={handleAddSymptom}
            containerStyles="mt-6"
          />
          <FlatList
            data={symptoms}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-100 mt-6">
                <Text className="text-lg text-white font-pregular">{item}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Symptoms;
