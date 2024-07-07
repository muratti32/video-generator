import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <>
      <StatusBar style="light" backgroundColor="#161622" />
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
