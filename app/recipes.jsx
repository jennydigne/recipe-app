import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllRecipes } from '../firebaseRecipes';
import Feather from '@expo/vector-icons/Feather';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtered, setFiltered] = useState([]);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            const load = async () => {
                try {
                    const result = await fetchAllRecipes();
                    setRecipes(result);
                    setFiltered(result);
                } catch (error) {
                    console.error("Failed to fetch recipes:", error);
                }
            };
            load();
        }, [])
    );

    useEffect(() => {
        const query = searchQuery.toLowerCase().trim();

        const result = recipes.filter(recipe => {
            const titleMatch = recipe.title?.toLowerCase().includes(query);
            const ingredientsMatch = (recipe.ingredients || []).join(', ').toLowerCase().includes(query);
            const categoryMatch = (recipe.category ?? '').toLowerCase().includes(query);
            const timeMatch = (recipe.cookingTime ?? '').toLowerCase().includes(query);

            return titleMatch || ingredientsMatch || timeMatch || categoryMatch;
        });

        setFiltered(result);
    }, [searchQuery, recipes]);

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search by title, ingredients, category or cooking time..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />
            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable style={styles.item} onPress={() => router.push({
                        pathname: `/recipe/${item.id}`,
                        params: { title: item.title }
                    })}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Feather name="clock" size={16} color="gray" style={{ marginRight: 4 }} />
                                <Text style={styles.itemInfo}>{item.cookingTime}</Text>
                            </View>
                            {item.category && (
                                <View style={styles.metaItem}>
                                    <Feather name="tag" size={16} color="gray" style={{ marginRight: 4 }} />
                                    <Text style={styles.itemInfo}>{item.category}</Text>
                                </View>
                            )}
                        </View>
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
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
});
