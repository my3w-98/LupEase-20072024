import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../config/firebase'; // Adjust the import path as necessary

const AuthLayout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Handle user state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        router.replace('/home'); // Redirect to your home screen if user is authenticated
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // Unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null; // Show a loading indicator while initializing

  return (
    <>
      <Stack>
        {!user ? (
          <>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          </>
        ) : (
          <Stack.Screen name="home" options={{ headerShown: false }} />
        )}
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
