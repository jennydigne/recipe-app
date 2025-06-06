import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Dropdown = ({ options, selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={[
                    styles.dropdown,
                    open ? styles.dropdownOpen : styles.dropdownClosed
                ]}
                onPress={() => setOpen(!open)}
                ref={dropdownRef}
            >
                <View style={styles.dropdownContent}>
                    <Text style={styles.dropdownText}>
                        {selected ? selected : 'Select a category'}
                    </Text>
                    <Feather name={open ? 'chevron-up' : 'chevron-down'} size={20} color="#333" />
                </View>
            </TouchableOpacity>

            {open && (
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
        zIndex: 999,
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
        maxHeight: 203,
        paddingVertical: 8
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
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
        borderBottomWidth: 0
    },
    dropdownContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Dropdown;
