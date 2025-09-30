import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
const { colors } = GlobalStyles;

function Input({ label, textInputConfig, style }) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
        marginHorizontal: 4,
    },
    label: {
        marginBottom: 4,
        fontSize: 12,
        color: colors.primary100,
    },
    input: {
        backgroundColor: colors.primary100,
        color: colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    textInput: {
        padding: 6,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: 'transparent',
        color: 'white',
    },
    invalidLabel: {
        color: '#ffb3b3',
    },
    invalidInput: {
        borderColor: '#ffb3b3',
        backgroundColor: '#ffcccc',
    },
});