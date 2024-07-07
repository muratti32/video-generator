import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { CustomButton } from '@/components/custom-button';
import { StatusBar } from 'expo-status-bar';

const Main = () => {
  return (
    <SafeAreaView className=" bg-primary h-full">
      <StatusBar style="light" backgroundColor="#161622" />
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130] h-[84]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380]  w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-white font-bold text-center text-3xl">
              Discover Endless Possibilities{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-2 -right-8 w-[136px] h-[15px]"
              resizeMode="contain"
            />
          </View>
          <Text className="font-pregular text-sm mt-7 text-center text-gray-100">
            Where creativity meets technology. Aora is a platform that allows
            you to create and share your ideas with the world.
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyle={'mt-7 w-full'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
