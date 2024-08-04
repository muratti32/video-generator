import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants/images';
import { CustomButton } from '@/components/custom-button';
import { router } from 'expo-router';

type Props = {
  title?: string;
  subtitle?: string;
  buttonText: string;
};

export const EmptyState = (props: Props) => {
  const { title, subtitle, buttonText } = props;
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270] h-[215]"
        resizeMode="contain"
      />
      {title && (
        <Text className="font-pmedium text-lg text-gray-100">{title} </Text>
      )}
      {subtitle && (
        <Text className="text-gray-100 text-sm font-pregular mt-2">
          {subtitle}
        </Text>
      )}
      <CustomButton
        title={buttonText}
        handlePress={() => router.push('/create')}
        containerStyle={'my-6 w-full'}
      />
    </View>
  );
};
