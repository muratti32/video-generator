import { icons } from '@/constants/icons';
import { IVideo } from '@/types';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ViewToken,
} from 'react-native';
import * as Animateble from 'react-native-animatable';
type Props = {
  posts: any;
};
import { Video, ResizeMode, AVPlaybackSource } from 'expo-av';

export const Trending = (props: Props) => {
  const { posts } = props;

  const [activeItem, setActiveItem] = useState<string>();

  const viewableItemsChanged = (info: {
    viewableItems: ViewToken<any>[];
    changed: ViewToken<any>[];
  }) => {
    if (info.viewableItems.length > 0) {
      setActiveItem(info.viewableItems[0].key);
    }
  };

  useEffect(() => {
    if (posts.documents?.length) {
      setActiveItem(posts.documents[0].$id);
    }
  }, [posts]);

  if (activeItem === undefined) return <Animateble.View></Animateble.View>;

  return (
    <FlatList
      data={posts.documents}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 150,
      }}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
    />
  );
};

interface TrendingItemProps {
  activeItem: string;
  item: IVideo;
}

const TrendingItem = (props: TrendingItemProps) => {
  const { activeItem, item } = props;
  const [play, setPlay] = useState(false);

  const zoomIn = {
    0: {
      scale: 0.8,
      opacity: 0.5,
    },
    1: {
      opacity: 1,
      scale: 1.1,
    },
  };
  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    1: {
      opacity: 0.5,
      scale: 0.9,
    },
  };

  return (
    <Animateble.View
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: item.video,
          }}
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay={true}
          onError={(error) => {
            console.log(`halo error:`, error);
          }}
          className="w-52 h-72 mx-2 rounded-[33px] bg-white/10 mt-4"
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="w-52 h-72  my-5 rounded-[33px] shadow-black/40 overflow-hidden shadow-lg"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-12 h-12 absolute"
          />
        </TouchableOpacity>
      )}
    </Animateble.View>
  );
};
