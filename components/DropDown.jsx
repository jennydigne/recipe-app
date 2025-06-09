import { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Dropdown = ({ options, selected, setSelected, isOpen, toggleOpen }) => {
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        setSelected(option);
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[
                    styles.dropdown,
                    isOpen ? styles.dropdownOpen : styles.dropdownClosed
                ]}
                onPress={toggleOpen}
                ref={dropdownRef}
            >
                <View style={styles.dropdownContent}>
                    <Text style={styles.dropdownText}>
                        {selected ? selected : 'Select an option'}
                    </Text>
                    <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
                </View>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownList}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dropdownItem}
                            onPress={() => handleSelect(option)}
                        >
                            <Text style={styles.itemText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    dropdown: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
    },
    dropdownList: {
        position: 'absolute',
        top: 40,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        maxHeight: 210,
        paddingVertical: 8,
        zIndex: 999,
        elevation: 10, 
    },
    dropdownItem: {
        padding: 10
    },
    itemText: {
        fontSize: 14,
    },
    dropdownClosed: {
        borderRadius: 5,
    },
    dropdownOpen: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 0,
    },
    dropdownContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Dropdown;

