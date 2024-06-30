import { ScrollView, StyleSheet, FlatList, Image } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { ReactElement, useEffect, useMemo, useState } from "react";

export type ArticleType = {
  title: string;
  author: string;
  url: string;
  image: string;
};

export default function TabTwoScreen() {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    if (articles.length === 0) {
      fetch("https://znith-server.onrender.com/api/news")
        .then((response) => response.json())
        .then((data) => setArticles(data.articles));
    }
  }, [articles.length]);

  const Item = (props: ArticleType) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: props.image }} style={styles.image} />
        <Text>{props.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={articles} renderItem={({ item }) => <Item {...item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
  },
  item: {
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
