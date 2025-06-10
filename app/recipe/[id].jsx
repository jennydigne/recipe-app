import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { fetchRecipeById, deleteRecipe } from '../../firebaseRecipes';
import Feather from '@expo/vector-icons/Feather';

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
            <ScrollView
                contentContainerStyle={styles.content}>
                <Text style={styles.title}>{recipe.title}</Text>
                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Feather name="clock" size={16} color="gray" />
                        <Text style={styles.metaText}>{recipe.cookingTime}</Text>
                    </View>
                    {recipe.category && (
                        <View style={styles.metaItem}>
                            <Feather name="tag" size={16} color="gray" />
                            <Text style={styles.metaText}>{recipe.category}</Text>
                        </View>
                    )}
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
                <Button title="Edit" backgroundColor="#C5EFCB" textColor="#06402B" borderColor="#06402B" borderWidth={1} onPress={() => router.push(`/edit/${id}`)} />
                <View style={styles.button}><Button title="Delete" backgroundColor="#F7C5D4" textColor="#851D2D" borderColor="#851D2D" borderWidth={1} onPress={handleDelete} /></View>
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
        padding: 20,
        flexDirection: "row",
    },
    button: {
        marginLeft: 20
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    metaText: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 4
    }
});

