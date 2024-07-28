import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';
import { router, usePathname } from 'expo-router';

type Props = {
  value: string;
  initialValue?: string | string[] | undefined;
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
  const { value, otherStyles, initialValue, keyboardType, placeholder } = props;
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
  };

  function handleSearchPress(event: GestureResponderEvent): void {
    if (!query) {
      Alert.alert(
        'Missing Query',
        'Please input something to search result across database',
      );
    }
    if (pathname.startsWith('/search')) router.setParams({ query });
    else router.push(`/search/${query}`);
  }

  return (
    <View className="w-full flex-row space-x-4 h-16 px-4 border-2 border-black-500  bg-black-100 rounded-xl items-center focus:border-secondary ">
      <TextInput
        className="flex-1 text-white text-base  w-full mt-0.5 font-pregular"
        value={query}
        placeholder={'Search for videos, channels, and more...'}
        placeholderTextColor={'#CDCDE0'}
        onChangeText={handleChange}
        keyboardType={keyboardType}
      />
      <TouchableOpacity onPress={handleSearchPress}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
