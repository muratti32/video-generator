import { View, Text, FlatList } from 'react-native';
import React from 'react';

type Props = {
  posts: any[];
};

export const Trending = (props: Props) => {
  const { posts } = props;
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    />
  );
};
