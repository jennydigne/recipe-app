import { Stack } from 'expo-router';
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BackButton from '../components/BackButton';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        barStyle="dark-content"
      />
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#C5EFCB",
        },
        headerBackVisible: false
      }}>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Recipe Manager",
            headerTitleStyle: {
              fontSize: 20
            }
          }} />
        <Stack.Screen
          name="add"
          options={{
            headerTitle: "Add new recipe",
            headerLeft: () => <BackButton />
          }} />
        <Stack.Screen
          name="recipe/[id]"
          options={({ route }) => ({
            headerTitle: route.params?.title || "Recipe",
            headerLeft: () => <BackButton />
          })}
        />
        <Stack.Screen
          name="recipes"
          options={{
            headerTitle: "Recipe collection",
            headerLeft: () => <BackButton />
          }} />
      </Stack>
    </SafeAreaProvider>
  )
}