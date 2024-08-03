import { View, Text } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  titleStyle?: any;
  containerStyle?: any;
};

export const InfoBox = (props: Props) => {
  const { title, subtitle, titleStyle, containerStyle } = props;
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-psemibold ${titleStyle}`}>
        {title}
      </Text>
      {subtitle && (
        <Text className={`text-gray-100 text-center font-pregular `}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};
