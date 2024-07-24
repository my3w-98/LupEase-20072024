import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
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
