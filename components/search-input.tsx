import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';

type Props = {
  value: string;
  handleChange: (value: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
};

export const SearchInput = (props: Props) => {
  const { value, handleChange, otherStyles, keyboardType, placeholder } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-full flex-row space-x-4 h-16 px-4 border-2 border-black-500  bg-black-100 rounded-xl items-center focus:border-secondary ">
      <TextInput
        className="flex-1 text-white text-base  w-full mt-0.5 font-pregular"
        value={value}
        placeholder={'Search for videos, channels, and more...'}
        placeholderTextColor={'#8D8D8D'}
        onChangeText={handleChange}
        keyboardType={keyboardType}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
