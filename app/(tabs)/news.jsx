import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news from selected sources
    // Example: setNews([{ title: 'News 1' }, { title: 'News 2' }]);
  }, []);

  return (
    <SafeAreaView className="bg-primarytabs flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        <View className="bg-customColors-color1 rounded-lg p-6">
          <Text className="text-2xl text-white font-psemibold">News Updates</Text>
          <FlatList
            data={news}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="p-4 border-b border-gray-100">
                <Text className="text-lg text-white font-pregular">{item.title}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default News;
