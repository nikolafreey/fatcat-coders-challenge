import { Pressable, StyleSheet, Text } from 'react-native';

function Button({ text, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Text>{text}</Text>
    </Pressable>
  );
}

export default Button;

export interface ButtonProps {
  text: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
