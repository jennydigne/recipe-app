import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function CloseButton() {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.replace("/recipes")}>
            <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
    );
}