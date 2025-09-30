import { StyleSheet, View, Text, Alert } from 'react-native';

import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

import { GlobalStyles } from '../../constants/styles';
const { colors } = GlobalStyles;


function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

    const [inputValues, setInputValues] = useState({
        amount: { value: defaultValues ? defaultValues.amount.toString() : '', isValid: true },
        date: { value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true },
        description: { value: defaultValues ? defaultValues.description : '', isValid: true }
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputIdentifier]: { value: enteredValue, isValid: true }
        }));
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value.trim()
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // show some error
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputValues((curInputs) => ({
                amount: { value: curInputs.amount.value, isValid: amountIsValid },
                date: { value: curInputs.date.value, isValid: dateIsValid },
                description: { value: curInputs.description.value, isValid: descriptionIsValid }
            }));
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    invalid={!inputValues.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        value: inputValues.amount.value,
                        onChangeText: inputChangedHandler.bind(this, 'amount')
                    }} style={styles.rowInput}
                />
                <Input
                    label="Date"
                    invalid={!inputValues.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10, value: inputValues.date.value,
                        onChangeText: inputChangedHandler.bind(this, 'date')
                    }} style={styles.rowInput}
                />
            </View>
            <Input
                label="Description"
                invalid={!inputValues.description.isValid}
                textInputConfig={{
                    multiline: true,
                    value: inputValues.description.value,
                    onChangeText: inputChangedHandler.bind(this, 'description')
                }} />
            {formIsInvalid && <Text style={styles.errorText}>Please check your inputs</Text>}
            <View style={styles.buttons}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 24,
        color: 'white',
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: colors.error500,
        fontWeight: 'bold',
        margin: 8,
    }
});