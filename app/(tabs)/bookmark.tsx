import { FlatList, Image, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { SearchInput } from '@/components/search-input';
import { EmptyState, VideoCard } from '@/components';
import { searchPosts } from '@/lib/appWrite';
import useAppWrite from '@/lib/useAppWrite';
import { useLocalSearchParams } from 'expo-router';

type Props = {};

const Bookmark = (props: Props) => {
  const { query } = useLocalSearchParams();

  const fetcher = useCallback(async () => {
    const result = await searchPosts(query?.toString());
    return result;
  }, [query]);

  const { data: posts } = useAppWrite(fetcher);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts.documents}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-3xl font-psemibold text-white">
                  Saved Videos
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images['logo-small']}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput value="" initialValue={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            buttonText="Back To Explore"
            title=""
            subtitle="No bookmark found"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
