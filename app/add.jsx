import { View, Text, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import { useState } from 'react';

export default function AddRecipe() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookingTime, setCookingTime] = useState("");

    const router = useRouter();

    const handleSave = async () => {
        if (!title.trim() || !ingredients.trim() || !instructions.trim() || !cookingTime.trim()) {
            Alert.alert("Please fill out all fields before saving");
            return;
        }

        const newRecipe = {
            id: Date.now().toString(),
            title,
            ingredients: ingredients
                .split("\n")
                .map(line => line.trim())
                .filter(line => line !== ""),
            instructions: instructions
                .split("\n")
                .map(line => line.trim())
                .filter(line => line !== ""),
            cookingTime: parseInt(cookingTime)
        };

        try {
            const existing = await AsyncStorage.getItem('recipes');
            const recipes = existing ? JSON.parse(existing) : [];
            recipes.push(newRecipe);
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
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
                    placeholder="Add one ingredient per line"
                    multiline
                />
                <Text style={styles.label}>Instructions</Text>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    value={instructions}
                    onChangeText={setInstructions}
                    placeholder="Add one instruction step per line"
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
    input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: "white"
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top'
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: "flex-start"
    }
})