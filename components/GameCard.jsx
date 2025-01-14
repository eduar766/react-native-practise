import { useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View, Animated } from "react-native";

export function GameCard({ game }) {
  return (
    <View
      className="flex-row bg-gray-500/10 p-4 rounded-xl gap-4 mb-10"
      key={game.slug}
    >
      <Image source={{ uri: game.image }} style={styles.image} />
      <View>
        <Text className="mb-1" style={styles.title}>
          {game.title}
        </Text>
        <Text style={styles.score}>{game.score}</Text>
        <Text className="mt-2 flex-shrink-0" style={styles.description}>
          {game.description.slice(0, 100)} ...{" "}
        </Text>
      </View>
    </View>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay: 100 * index,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 42,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  description: {
    color: "#fff",
    fontSize: 16,
  },
  score: {
    color: "#fff",
    fontSize: 16,
  },
});
