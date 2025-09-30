import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
const { colors } = GlobalStyles;

function Input({ label, textInputConfig, style, invalid }) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={[...inputStyles, invalid && styles.invalidInput]} {...textInputConfig} />
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
        color: colors.error500,
    },
    invalidInput: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.error500,
        backgroundColor: colors.error50,
    },
});