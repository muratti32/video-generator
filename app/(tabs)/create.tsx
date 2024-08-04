import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { CustomButton, FormField } from '@/components';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '@/constants/icons';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '@/lib/appWrite';
import { useGlobalContext } from '@/context/global-provider';

type Form = {
  title: string;
  video: {
    uri: string;
    type?: string;
    name?: string;
    size?: number;
  } | null;
  thumbnail: {
    uri: string;
    type?: string;
    name?: string;
    size?: number;
  } | null;
  prompt: string;
};

type Props = {};

const Create = (props: Props) => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<Form>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = (type: 'Image' | 'Video') => async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        type === 'Image'
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(`halo result:`, result);
    if (!result.canceled) {
      if (type === 'Image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!user) return new Error('No user found');
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      setUploading(true);
      const result = await createPost(
        form.title,
        form.video,
        form.thumbnail,
        form.prompt,
        user?.$id,
      );
      console.log(`halo result:`, result);
      if (!result) throw new Error('No post created');
      Alert.alert('Success', 'Post created successfully');
    } catch (error) {
      setUploading(false);
      console.log('halo upload create error', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6 space-y-4 flex-col">
        <Text className="text-2xl text-white font-pbold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          handleChange={(value) => setForm({ ...form, title: value })}
          placeholder="Enter video title"
          otherStyles="mt-10"
        />
        <View>
          <Text className="text-gray-100 text-base font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={openPicker('Video')}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                className="w-full h-64 rounded-2xl"
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center flex items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100  flex justify-center items-center ">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium">
            Upload Video Thumbnail
          </Text>
          <TouchableOpacity onPress={openPicker('Image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode={ResizeMode.COVER}
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a thumbnail
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          handleChange={(value) => setForm({ ...form, prompt: value })}
          placeholder="Enter AI Prompt"
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
