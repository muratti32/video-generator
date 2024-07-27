import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { IVideo } from '@/types';
import { icons } from '@/constants/icons';
import { ResizeMode, Video } from 'expo-av';

type Props = {
  video: IVideo;
};

export const VideoCard = (props: Props) => {
  const { video } = props;
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46] h-[46] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.users.avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-4">
            <Text
              className="text-sm text-white font-psemibold "
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text className="text-sm text-gray-100 font-pregular">
              {video.users.username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video.video }}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay={true}
          onError={(error) => {
            console.log(`halo error:`, error);
          }}
          className="w-full h-60 mx-2 rounded-xl bg-white/10 mt-3"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
