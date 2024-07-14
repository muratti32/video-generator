import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { SearchInput } from '@/components/search-input';
import { EmptyState, Trending } from '@/components';
import { getAllPosts } from '@/lib/appWrite';
import useAppWrite from '@/lib/useAppWrite';

type Props = {};

const Home = (props: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: posts, finished } = useAppWrite(getAllPosts);
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  console.log(`halo posts:`, posts.documents);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts.documents}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text className="text-white">{item.title} </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">Halo</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images['logo-small']}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput value="" handleChange={() => {}} />
            <View className="w-full flex-1 pt-5 pb-8 ">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
            </View>

            <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video Found"
            subtitle="Be the first one to upload "
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
