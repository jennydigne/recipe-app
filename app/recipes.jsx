import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllRecipes } from '../firebaseRecipes';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState("a-z");
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
            const timeMatch = (recipe.cookingTime ?? '').toLowerCase().includes(query);
            const tagMatch = (recipe.tags || []).join(', ').toLowerCase().includes(query);

            return titleMatch || ingredientsMatch || timeMatch || tagMatch;
        });

        result.sort((a, b) => {
            if (sortOption === "a-z") return a.title.localeCompare(b.title);
            if (sortOption === "z-a") return b.title.localeCompare(a.title);
            return 0;
        });

        setFiltered(result);
    }, [searchQuery, recipes, sortOption]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Find a recipe</Text>
            <TextInput
                placeholder="Search by title, ingredient, tag or cooking time"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />

            <Text style={styles.label}>Sort recipes</Text>
            <View style={styles.sortContainer}>
                <Pressable style={[styles.sortButton, sortOption === "a-z" && styles.sortButtonSelected]}
                    onPress={() => setSortOption("a-z")}>
                    <Text style={styles.sortButtonText}>A–Z</Text>
                </Pressable>
                <Pressable style={[styles.sortButton, sortOption === "z-a" && styles.sortButtonSelected]}
                    onPress={() => setSortOption("z-a")}>
                    <Text style={styles.sortButtonText}>Z–A</Text>
                </Pressable>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable style={styles.item} onPress={() => router.replace({
                        pathname: `/recipe/${item.id}`,
                        params: { title: item.title }
                    })}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Text style={styles.itemInfo}>{item.cookingTime}</Text>
                            </View>
                            {item.tags?.slice(0, 3).map(tag => (
                                <View key={tag} style={styles.tagPreview}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
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
        borderColor: "gray",
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
    },
    item: {
        padding: 12,
        backgroundColor: "#F2F2F2",
        borderRadius: 6,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemInfo: {
        fontSize: 12,
    },
    emptyList: {
        marginTop: 20
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    metaItem: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: "#d0ecf5",
        borderRadius: 5
    },
    tagPreview: {
        backgroundColor: '#D1EDD5',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 5,
        marginLeft: 6,
    },
    tagText: {
        fontSize: 12,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5
    },
    sortContainer: {
        flexDirection: "row",
        marginBottom: 16,
        flexWrap: "wrap"
    },
    sortButton: {
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1
    },
    sortButtonSelected: {
        backgroundColor: "#D1EDD5"
    },
    sortButtonText: {
        fontSize: 12
    }
});
