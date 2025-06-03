import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Button({ title, onPress }) {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#222222",
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500"
    }
})