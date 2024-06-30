import {
  StyleSheet,
  FlatList,
  Image,
  SectionList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import * as WebBrowser from "expo-web-browser";

import { Text, View } from "@/components/Themed";
import { useCallback, useEffect, useMemo, useState } from "react";

export type ArticleType = {
  title: string;
  author: string;
  url: string;
  image: string;
  trending?: boolean;
  source: string;
};

export default function TabTwoScreen() {
  const [trending, setTrending] = useState<ArticleType[]>([]);
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    if (articles.length === 0) {
      fetch("https://znith-server.onrender.com/api/news")
        .then((response) => response.json())
        .then((data) => {
          if (data.articles) {
            if (data.articles.length > 1) {
              setTrending([data.articles[0], data.articles[1]]);
              setArticles(data.articles.slice(2));
            }
          }
        });
    }
  }, [articles.length]);

  const sections = useMemo(() => {
    return [
      { title: "Trending", key: "trending", data: ["trending"] },
      { title: "Other Stories", key: "otherStories", data: ["Other Stories"] },
    ];
  }, []);

  const onItemClick = useCallback((url: string) => {
    return async () => {
      await WebBrowser.openBrowserAsync(url);
    };
  }, []);

  const TrendingItem = (props: ArticleType) => {
    return (
      <View style={styles.trending}>
        <TouchableOpacity onPress={onItemClick(props.url)}>
          <Image source={{ uri: props.image }} style={styles.trendingImage} />
          <Text style={styles.title}>{props.title}</Text>
          <Text style={{ margin: 5 }}>{props.source}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const Item = (props: ArticleType) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={onItemClick(props.url)}>
          <Image source={{ uri: props.image }} style={styles.image} />
          <Text style={styles.title}>{props.title}</Text>
          <Text style={{ margin: 5 }}>{props.source}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSection = ({ item }: Record<string, any>) => {
    if (item === "trending") {
      return (
        <FlatList
          numColumns={1}
          data={trending}
          renderItem={({ item }) => <TrendingItem {...item} />}
        />
      );
    } else {
      return (
        <FlatList
          data={articles}
          numColumns={2}
          renderItem={({ item }) => <Item {...item} />}
        />
      );
    }
  };

  const renderSectionHeader = ({ section }: Record<string, any>) => {
    return (
      <View>
        <Text style={styles.sectionTiltle}>{section.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        style={{ width: "100%" }}
        sections={sections}
        renderItem={renderSection}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trendingImage: {
    width: "100%",
    height: 200,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  trending: {
    borderRadius: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  item: {
    margin: 5,
    borderRadius: 10,
    width: (Dimensions.get("screen").width - 20) / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  sectionTiltle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "top",
    margin: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlignVertical: "top",
    margin: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
