import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import { useState } from 'react';
import { saveRecipe } from '../firebaseRecipes';
import Dropdown from '../components/DropDown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddRecipe() {
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookingTime, setCookingTime] = useState(null);
    const [category, setCategory] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const categoryOptions = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
    const cookingTimeOptions = ['< 15 min', '< 30 min', '< 45 min', '< 60 min', '> 60 min']

    const router = useRouter();

    const handleSave = async () => {
        if (!title.trim() || !ingredients.trim() || !instructions.trim() || !cookingTime.trim()) {
            Alert.alert("Please fill out all fields before saving");
            return;
        }

        const newRecipe = {
            title,
            category,
            cookingTime,
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
            <Text style={styles.menuLabel}>Category</Text>
            <Dropdown
                options={categoryOptions}
                selected={category}
                setSelected={(value) => {
                    setCategory(value);
                    setActiveDropdown(null);
                }}
                isOpen={activeDropdown === 'category'}
                toggleOpen={() =>
                    setActiveDropdown(activeDropdown === 'category' ? null : 'category')
                }
            />
            <Text style={styles.menuLabel}>Cooking time</Text>
            <Dropdown
                options={cookingTimeOptions}
                selected={cookingTime}
                setSelected={(value) => {
                    setCookingTime(value);
                    setActiveDropdown(null);
                }}
                isOpen={activeDropdown === 'cookingTime'}
                toggleOpen={() =>
                    setActiveDropdown(activeDropdown === 'cookingTime' ? null : 'cookingTime')
                }
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
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        marginTop: 10
    },
    menuLabel: {
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
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    scrollView: {
        backgroundColor: "white"
    }
})