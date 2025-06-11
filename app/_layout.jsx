import { Stack } from 'expo-router';
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CloseButton from '../components/CloseButton';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="dark-content"
      />
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#F2F2F2",
        },
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: "black",
        headerBackVisible: true,
      }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Recipe Manager",
            headerBackVisible: false,
            headerTitleStyle: {
              fontSize: 20,
            }
          }} />
        <Stack.Screen
          name="add"
          options={{
            headerTitle: "Add new recipe"
          }} />
        <Stack.Screen
          name="recipe/[id]"
          options={({ route }) => ({
            headerTitle: route.params?.title || "Recipe",
            headerBackVisible: false,
            headerRight: () => <CloseButton />
          })}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            headerTitle: "Edit recipe"
          }}
        />
        <Stack.Screen
          name="recipes"
          options={{
            headerTitle: "Recipe collection"
          }} />
      </Stack>
    </SafeAreaProvider>
  )
}