import { FlatList, Image, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { SearchInput } from '@/components/search-input';
import { EmptyState, FormField, VideoCard } from '@/components';
import { searchPosts } from '@/lib/appWrite';
import useAppWrite from '@/lib/useAppWrite';
import { useLocalSearchParams } from 'expo-router';

type Props = {};

const Bookmark = (props: Props) => {
  const { query } = useLocalSearchParams();
  const [searchParam, setSearchParam] = useState<string>('');

  const fetcher = useCallback(async () => {
    if (searchParam.length < 3) return;
    const result = await searchPosts(searchParam?.toString());
    return result;
  }, [searchParam]);

  const { data: posts } = useAppWrite(fetcher);
  const handleSearchChange = (value: string) => {
    setSearchParam(value);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts.documents}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={
          <RenderHeader value={searchParam} handleChange={handleSearchChange} />
        }
        ListEmptyComponent={() => (
          <EmptyState
            buttonText="Back To Explore"
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

interface RenderHeaderProps {
  value: string;
  handleChange: (value: string) => void;
}
const RenderHeader = (props: RenderHeaderProps) => {
  const { value, handleChange } = props;
  return (
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
      <FormField
        placeholder="Search your saved videos"
        value={value}
        handleChange={handleChange}
        placeholderTextColor="#CDCDE0"
      />
    </View>
  );
};
