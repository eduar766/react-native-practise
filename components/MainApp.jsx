import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard, GameCard } from "./GameCard";
import { Logo } from "./Logo";

export function MainApp() {
  const [games, setGames] = useState([]); // es como tener una variable que cada vez que cambia de valor se renderiza
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View style={{ marginBottom: 24 }}>
        <Logo />
      </View>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        // <ScrollView>
        //     //Scrollview es basico, lo ideal es usar FlatList
        //   {games.map((game) => (
        //     <GameCard key={game.slug} game={game} />
        //   ))}
        // </ScrollView>
        <FlatList
          data={games}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
          keyExtractor={(game) => game.slug}
        />
      )}
    </View>
  );
}
