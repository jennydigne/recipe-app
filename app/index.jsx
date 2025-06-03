import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Recipe Manager <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black" /></Text>
            <Text style={styles.subHeading}>Create your own recipe collection with Recipe Manager</Text>
            <View style={styles.buttonContainer}>
                <Button title="My recipes" onPress={() => router.push("/recipes")} />
                <Button title="Add recipe" onPress={() => router.push("/add")} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 100,
        alignItems: "center",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    subHeading: {
        fontSize: 18,
        marginBottom: 40,
        marginHorizontal: 20,
        textAlign: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "70%"
    },
})