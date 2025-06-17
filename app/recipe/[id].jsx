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
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.metaRow}>
                    <View style={[styles.metaItem, styles.cookingTimeItem]}>
                        <Text style={styles.metaText}>{recipe.cookingTime}</Text>
                    </View>

                    {recipe.tags?.map((tag) => (
                        <View key={tag} style={styles.metaItem}>
                            <Text style={styles.metaText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                {recipe.ingredients.map((item, index) => (
                    <Text key={index} style={styles.item}>• {item}</Text>
                ))}

                <Text style={styles.sectionTitle}>Instructions</Text>
                {recipe.instructions.map((item, index) => (
                    <Text key={index} style={styles.item}>{index + 1}. {item}</Text>
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button title="Edit recipe" variant="primary" onPress={() => router.push(`/edit/${id}`)} />
                <Button title="Delete recipe" variant="delete" style={styles.button} onPress={handleDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    content: {
        paddingBottom: 40,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8
    },
    item: {
        fontSize: 16,
        marginBottom: 4
    },
    buttonContainer: {
        padding: 20,
        flexDirection: "row"
    },
    button: {
        marginLeft: 15
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 5
    },
    metaItem: {
        backgroundColor: "#D1EDD5",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        marginRight: 5,
        marginBottom: 5
    },
    metaText: {
        fontSize: 12
    },
    cookingTimeItem: {
        backgroundColor: "#D0ECF5"
    }
});
