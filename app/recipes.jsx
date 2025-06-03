import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtered, setFiltered] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            const loadRecipes = async () => {
                const stored = await AsyncStorage.getItem('recipes');
                const parsed = stored ? JSON.parse(stored) : [];
                setRecipes(parsed);
                setFiltered(parsed);
            };
            loadRecipes();

        }, [])
    );

    useEffect(() => {
        const query = searchQuery.toLowerCase().trim();

        const result = recipes.filter(recipe => {
            const titleMatch = recipe.title.toLowerCase().includes(query);
            const ingredientsMatch = recipe.ingredients.join(', ').toLowerCase().includes(query);
            const timeMatch = recipe.cookingTime.toString().includes(query);

            return titleMatch || ingredientsMatch || timeMatch;
        });

        setFiltered(result);
    }, [searchQuery, recipes]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search by title, ingredients or cooking time..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable style={styles.item} onPress={() => router.push(`/recipe/${item.id}`)}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemInfo}>{item.cookingTime} min</Text>
                    </Pressable>
                )}
                ListEmptyComponent={<Text style={styles.emptyList}>No search results</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
        backgroundColor: "white"
    },
    item: {
        padding: 12,
        backgroundColor: '#f2f2f2',
        borderRadius: 6,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemInfo: {
        fontSize: 14,
        color: 'gray',
    },
    emptyList: {
        marginTop: 20
    }
});
