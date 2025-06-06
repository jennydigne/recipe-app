import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import { useState } from 'react';
import { saveRecipe } from '../firebaseRecipes';
import Dropdown from '../components/DropDown';

export default function AddRecipe() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [category, setCategory] = useState(null);
    const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];

    const router = useRouter();

    const handleSave = async () => {
        if (!title.trim() || !ingredients.trim() || !instructions.trim() || !cookingTime.trim()) {
            Alert.alert("Please fill out all fields before saving");
            return;
        }

        const newRecipe = {
            title,
            category,
            cookingTime: parseInt(cookingTime),
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
            await saveRecipe(newRecipe);
            Alert.alert("Recipe saved!");
            router.back();
        } catch (error) {
            Alert.alert("Error saving");
            console.log(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={60}
                style={styles.container}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter recipe title"
                />
                <Text style={styles.categoryLabel}>Category</Text>
                <Dropdown
                    options={categoryOptions}
                    selected={category}
                    setSelected={setCategory}
                />
                <Text style={styles.label}>Cooking time</Text>
                <TextInput
                    style={styles.input}
                    value={cookingTime}
                    onChangeText={setCookingTime}
                    placeholder="Enter cooking time in minutes"
                    keyboardType='numeric'
                />
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
                    <Button title="Save recipe" onPress={handleSave} />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    label: {
        fontWeight: "bold",
        marginTop: 10
    },
    categoryLabel: {
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: "top"
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: "flex-start"
    },
})