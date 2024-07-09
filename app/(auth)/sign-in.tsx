import React, { useState } from 'react';
import { ScrollView, Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { FormField } from '@/components/form-field';
import { CustomButton } from '@/components/custom-button';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/appWrite';
type Props = {};

const SignIn = (props: Props) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      alert('Please fill all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = signIn(form.email, form.password);
      console.log(`halo result:`, result);
      setIsSubmitting(false);
      router.replace('/home');
    } catch (error: any) {
      setIsSubmitting(false);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center  min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115] h-[35] mx-auto"
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-psemibold mt-10 mx-auto">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(value) => setForm({ ...form, email: value })}
            keyboardType="email-address"
            otherStyles="mt-5"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(value) => setForm({ ...form, password: value })}
            keyboardType="default"
            otherStyles="mt-5"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle={'mt-7'}
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have a account?
            </Text>
            <Link
              href={'/sign-up'}
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign Up{' '}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
