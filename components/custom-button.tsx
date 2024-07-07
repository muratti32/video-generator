import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  handlePress: () => void;
  containerStyle?: any;
  textStyle?: any;
  isLoading?: boolean;
};

export const CustomButton = (props: Props) => {
  const { title, handlePress, containerStyle, textStyle, isLoading } = props;
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isLoading}
      className={`bg-secondary rounded-xl min-h-[59] justify-center items-center ${containerStyle} ${
        isLoading ? 'opacity-50' : ''
      }`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
