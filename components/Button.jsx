import { Pressable, Text, StyleSheet } from 'react-native';

export default function Button({ onPress, title, variant = 'primary', style }) {
  const variantStyles = {
    primary: {
      button: styles.primary,
      text: styles.text_primary,
    },
    secondary: {
      button: styles.secondary,
      text: styles.text_secondary,
    },
    delete: {
      button: styles.delete,
      text: styles.text_delete,
    },
  };

  const currentStyle = variantStyles[variant] || variantStyles.primary;

  return (
    <Pressable onPress={onPress} style={[styles.buttonBase, currentStyle.button, style]}>
      <Text style={[styles.textBase, currentStyle.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  textBase: {
    fontWeight: '500',
    fontSize: 16
  },
  primary: {
    backgroundColor: '#C5EFCB',
    borderColor: '#06402B'
  },
  text_primary: {
    color: '#06402B',
  },
  secondary: {
    backgroundColor: '#F2F2F2',
    borderColor: '#222222',
  },
  text_secondary: {
    color: '#222222',
  },
  delete: {
    backgroundColor: '#F5C2B5',
    borderColor: '#851D2D'
  },
  text_delete: {
    color: '#851D2D',
  },
});

