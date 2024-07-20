import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { Link } from 'expo-router'



const SignUp = () => {

  const [form, setform] = useState({
    username:'',
    email:'',
    password:'',

  })

const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () =>{

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-3 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[80px] h-[45px] "/>
          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Sign up to LupEase</Text>
          <FormField
          title="Username"
          value={form.username}
          handleChangeText={(e) => setform({...form,
            username: e })}
            otherStyles="mt-10"
          ></FormField>
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setform({...form,
            email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          ></FormField>
          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setform({...form,
          password: e })}
          otherStyles="mt-7"
          ></FormField>
          <CustomButton 
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2 ">
            <Text className="text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp