import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';

type Props = {
  title: string;
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

export const FormField = (props: Props) => {
  const { title, value, handleChange, otherStyles, keyboardType, placeholder } =
    props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles} `}>
      <Text className="text-gray-100">{title}</Text>
      <View className="w-full flex-row h-16 px-4 border-2 border-black-500  bg-black-100 rounded-xl items-center focus:border-secondary ">
        <TextInput
          className="flex-1 text-white font-psemibold text-base  w-full"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChange}
          keyboardType={keyboardType}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons['eye-hide']}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
