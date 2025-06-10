import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Button({
  title,
  onPress,
  backgroundColor = "#222",
  textColor = "white",
  borderColor,
  borderWidth = 0
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth
        }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500"
    }
})

