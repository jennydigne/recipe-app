import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { fetchRecipeById, deleteRecipe } from '../../firebaseRecipes';

export default function RecipeDetail() {
    const { id } = useLocalSearchParams();
    const [recipe, setRecipe] = useState(null);

    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const result = await fetchRecipeById(id);
                setRecipe(result);
                if (result) {
                    navigation.setOptions({ title: result.title });
                }
            } catch (error) {
                console.log("Error loading recipe:", error);
            }
        };

        loadRecipe();
    }, [id]);

    const handleDelete = () => {
        Alert.alert("Delete recipe", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteRecipe(id);
                        router.back();
                    } catch (error) {
                        console.log("Error deleting recipe:", error);
                    }
                }
            }
        ]);
    };

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Loading recipe...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.item}>{recipe.cookingTime} minutes</Text>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((item, index) => (
                <Text key={index} style={styles.item}>• {item}</Text>
            ))}

            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((item, index) => (
                <Text key={index} style={styles.item}>{index + 1}. {item}</Text>
            ))}
            <View style={styles.buttonContainer}>
                <Button title="Delete recipe" onPress={handleDelete} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    item: {
        fontSize: 16,
        marginBottom: 4,
    },
    buttonContainer: {
        marginVertical: 20,
        alignSelf: "flex-start"
    }
});

