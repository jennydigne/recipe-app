import { View, Text, StyleSheet, TextInput, Alert, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import { updateRecipe, fetchRecipeById } from '../../firebaseRecipes';
import Dropdown from '../../components/DropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function EditRecipe() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookingTime, setCookingTime] = useState(null);
    const [tags, setTags] = useState([]);

    const cookingTimeOptions = ['< 15 min', '< 30 min', '< 45 min', '< 60 min', '> 60 min'];
    const allTags = [
        "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Vegetarian", "Vegan",
        "Seafood", "Meat", "Poultry"
    ];

    const router = useRouter();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const recipeToEdit = await fetchRecipeById(id);
                if (recipeToEdit) {
                    setTitle(recipeToEdit.title);
                    setCookingTime(recipeToEdit.cookingTime);
                    setIngredients(recipeToEdit.ingredients.join('\n'));
                    setInstructions(recipeToEdit.instructions.join('\n'));
                    setTags(recipeToEdit.tags || []);
                } else {
                    console.warn("Recipe not found");
                }
            } catch (error) {
                console.log("Error fetching:", error);
            }
        };

        loadRecipe();
    }, [id]);

    const toggleTag = (tag) => {
        if (tags.includes(tag)) {
            setTags(prev => prev.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleUpdate = async () => {
        if (!title.trim() || !ingredients.trim() || !instructions.trim() || !cookingTime) {
            Alert.alert("Please fill out all fields before saving");
            return;
        }

        const updatedRecipe = {
            title,
            cookingTime,
            tags,
            ingredients: ingredients
                .split("\n")
                .map(line => line.trim())
                .filter(line => line !== ""),
            instructions: instructions
                .split("\n")
                .map(line => line.trim())
                .filter(line => line !== ""),
        };

        try {
            await updateRecipe(id, updatedRecipe);
            Alert.alert("Recipe updated!");
            router.replace('/');
        } catch (error) {
            Alert.alert("Error updating recipe");
            console.log(error);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollView}
        >
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter recipe title"
            />
            <Text style={styles.label}>Cooking time</Text>
            <Dropdown
                options={cookingTimeOptions}
                selected={cookingTime}
                setSelected={setCookingTime}
            />
            <Text style={styles.label}>Edit tags (optional)</Text>
            <View style={styles.tagContainer}>
                {allTags.map((tag) => (
                    <Pressable
                        key={tag}
                        onPress={() => toggleTag(tag)}
                        style={[
                            styles.tag,
                            tags.includes(tag) && styles.tagSelected
                        ]}
                    >
                        <Text>{tag}</Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.label}>Ingredients</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={ingredients}
                onChangeText={setIngredients}
                placeholder="Add an ingredient and press return"
                multiline
            />
            <Text style={styles.label}>Instructions</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={instructions}
                onChangeText={setInstructions}
                placeholder="Add an instruction step and press return"
                multiline
            />
            <View style={styles.buttonContainer}>
                <Button title="Save changes" variant="primary" onPress={handleUpdate} />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 5,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: "top"
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: "flex-start"
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    scrollView: {
        backgroundColor: "white"
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        marginRight: 8,
        marginBottom: 8,
    },
    tagSelected: {
        backgroundColor: '#D1EDD5',
    },
});
