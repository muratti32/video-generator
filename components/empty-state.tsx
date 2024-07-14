import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants/images';
import { CustomButton } from '@/components/custom-button';
import { router } from 'expo-router';

type Props = {
  title: string;
  subtitle: string;
};

export const EmptyState = (props: Props) => {
  const { title, subtitle } = props;
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270] h-[215]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-lg text-gray-100">{title} </Text>
      <Text className="text-2xl font-psemibold text-white mt-3">
        {subtitle}
      </Text>
      <CustomButton
        title="Create Video"
        handlePress={() => router.push('/create')}
        containerStyle={'my-6 w-full'}
      />
    </View>
  );
};
