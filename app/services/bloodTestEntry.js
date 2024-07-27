// BloodTestEntry.js
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';

const defaultBloodTests = {
  ESR: ['ESR Value'],
  CRP: ['CRP Value'],
  'FBC/CBC': ['HB', 'WBC', 'Plt','Neutrophils','Lymphocytes','RBC','HCT','MCV','MCH'],
  ALT: ['ALT Value'],
  Other: [],
};

const BloodTestEntry = ({ bloodTestDone, setBloodTestDone, testName, setTestName, markers, setMarkers }) => {
  const [markerName, setMarkerName] = useState('');
  const [markerValue, setMarkerValue] = useState('');

  const handleAddMarker = () => {
    if (markerName.trim() && markerValue.trim()) {
      setMarkers([...markers, { name: markerName.trim(), value: markerValue.trim() }]);
      setMarkerName('');
      setMarkerValue('');
    }
  };

  return (
    <View className="mt-6">
      <Text className="text-lg text-white font-pregular">Blood Test Done?</Text>
      <Button title={bloodTestDone ? "Yes" : "No"} onPress={() => setBloodTestDone(!bloodTestDone)} />
      {bloodTestDone && (
        <View className="mt-6">
          <Text className="text-lg text-white font-pregular">Test Name</Text>
          <Picker
            selectedValue={testName}
            onValueChange={(itemValue) => setTestName(itemValue)}
            style={{ color: '#FFFFFF', backgroundColor: '#000000', borderRadius: 8, marginTop: 8 }}
          >
            {Object.keys(defaultBloodTests).map((test, index) => (
              <Picker.Item key={index} label={test} value={test} />
            ))}
          </Picker>
          <Text className="text-lg text-white font-pregular mt-6">Markers</Text>
          {defaultBloodTests[testName] && defaultBloodTests[testName].map((defaultMarker, index) => (
            <View key={index} className="flex-row justify-between">
              <Text className="text-lg text-white font-pregular">{defaultMarker}</Text>
              <TextInput
                className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200 w-20"
                placeholder="Value"
                placeholderTextColor="#CDCDE0"
                onChangeText={(value) => setMarkers([...markers, { name: defaultMarker, value }])}
                returnKeyType="done"
              />
            </View>
          ))}
          {testName === 'Other' && (
            <View>
              <TextInput
                className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
                placeholder="Enter marker"
                placeholderTextColor="#CDCDE0"
                value={markerName}
                onChangeText={setMarkerName}
                returnKeyType="done"
              />
              <TextInput
                className="border border-gray-100 rounded-md p-3 mt-2 text-white bg-black-200"
                placeholder="Enter marker value"
                placeholderTextColor="#CDCDE0"
                value={markerValue}
                onChangeText={setMarkerValue}
                returnKeyType="done"
              />
              <CustomButton
                title="Add Marker"
                handlePress={handleAddMarker}
                containerStyles="mt-6"
              />
            </View>
          )}
          {markers.length > 0 && (
            <FlatList
              data={markers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="p-4 border-b border-gray-100 mt-6">
                  <Text className="text-lg text-white font-pregular">{item.name}: {item.value}</Text>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default BloodTestEntry;
