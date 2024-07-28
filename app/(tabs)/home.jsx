import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../config/firebase'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'; // Assuming you're using react-native-elements

const Home = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful.
        navigation.navigate('Login'); // Navigate to the login screen after logout
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-row justify-end p-4">
        <TouchableOpacity onPress={handleLogout} className="flex-row items-center">
          <Icon name="logout" size={24} color="#fff" />
          <Text className="text-white ml-2">Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-3 my-6">
          <Text className="text-2xl text-white font-psemibold mt-10">Analytics</Text>
          <Text className="text-lg text-white font-pregular mt-7">Based on the recorded symptoms, you are doing great!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
