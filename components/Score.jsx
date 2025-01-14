import { View, Text } from "react-native";

export function Score({ score, maxScore }) {
  const getColors = () => {
    const percentaje = (score / maxScore) * 100;
    if (percentaje < 40) {
      return "bg-red-500";
    } else if (percentaje < 65) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500";
    }
  };

  const className = getColors();

  return (
    <View
      className={`${className} w-8 h-8 rounded-full justify-center items-center`}
    >
      <Text className="text-lg font-bold text-white">{score}</Text>
    </View>
  );
}
