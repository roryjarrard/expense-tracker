import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButton({ icon, size, color, onPress }) {
    return (
        <Pressable onPress={onPress} android_ripple={{ color: '#ccc' }} style={({ pressed }) => pressed ? styles.pressed : styles.default}>
            <View style={styles.iconButton}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        marginHorizontal: 18,
        marginVertical: 2,
        padding: 6,
    },
    default: {
        marginRight: 8,
    },
    pressed: {
        marginRight: 8,
        opacity: 0.75
    }
});