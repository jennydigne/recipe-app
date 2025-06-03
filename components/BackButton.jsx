import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function BackButton() {
    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
    );
}