import { Text, View, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserIcon,
  ChevronDownIcon,
  ViewfinderCircleIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from '../sanity'


const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      name,
      short_description,
      _id,
    }
    `
      )
      .then(data => setFeaturedCategories(data))
  }, [])


  return (
    <SafeAreaView className="bg- pt-5 flex-1 mb-2">
      <View
        className="flex-row pb-3 
      items-center mx-4 space-x-2"
      >
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-xs text-gray-400">Deliver Now</Text>
          <View className=" flex-row items-center">
            <Text className="font-bold text-xl">Current Location</Text>
            <ChevronDownIcon size={25} color="#00CCBB" />
          </View>
        </View>
        <UserIcon size={30} color="#00CCBB" />
      </View>
      <View className="flex-row mx-4 items-center pb-2 space-x-2">
        <View className=" flex-row space-x-2 bg-gray-200 px-2 py-2 rounded-full items-center flex-1">
          <ViewfinderCircleIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          ></TextInput>
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* body */}
      <ScrollView>
          {/* Categories */}
          <Categories />

          {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;