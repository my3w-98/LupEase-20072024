import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { auth } from '../config/firebase'; // Correctly import auth

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push('/home'); // Redirect to the home page if the user is signed in
      } else {
        setUser(null);
        router.push('/sign-in'); // Redirect to the sign-in page if the user is not signed in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[300px] h-[350px]"
            resizeMode="contain"
          />
          <View className="mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover The Endless Posibilities With{' '}
              <Text className="text-secondary-200">LupEase</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[140px] h-[18px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 text-center mt-7">
            A companion to ease your Lupus troubles
          </Text>
          <CustomButton
            title="Continue With Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
