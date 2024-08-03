import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchInput } from '@/components/search-input';
import { EmptyState, InfoBox, VideoCard } from '@/components';
import { getProfilePosts, signOut } from '@/lib/appWrite';
import useAppWrite from '@/lib/useAppWrite';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '@/context/global-provider';
import { icons } from '@/constants/icons';

type Props = {};

const Profile = (props: Props) => {
  const { query } = useLocalSearchParams();
  const { user, setIsLoggedIn, setUser } = useGlobalContext();

  console.log(`halo user In profile:`, user);
  const { data: posts } = useAppWrite(() => getProfilePosts(user?.$id));

  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUser(undefined);
    router.replace('/sign-in');
  };

  if (!user) return null;
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts?.documents}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4  ">
            <TouchableOpacity
              onPress={logout}
              className="w-full items-end mb-10 rounded-lg"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 mb-8 border-secondary border items-center  justify-center rounded-lg">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="contain"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox title={user?.username} />
            <View className="w-full justify-center items-center flex-row mt-4">
              <InfoBox
                title={posts.documents?.length?.toString() || '0'}
                subtitle="Posts"
                containerStyle="mr-8"
                titleStyle="text-xl"
              />
              <InfoBox
                title={'1.2k'}
                subtitle="Followers"
                containerStyle=""
                titleStyle="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video Found"
            subtitle="No video found with the given query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
