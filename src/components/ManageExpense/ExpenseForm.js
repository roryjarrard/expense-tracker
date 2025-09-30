import { StyleSheet, View, Text } from 'react-native';

import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';


function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
    console.log('defaultValues: ', defaultValues);
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        description: defaultValues ? defaultValues.description : ''
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputIdentifier]: enteredValue
        }));
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };
        onSubmit(expenseData);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        value: inputValues['amount'],
                        onChangeText: inputChangedHandler.bind(this, 'amount')
                    }} style={styles.rowInput}
                />
                <Input
                    label="Date"
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10, value: inputValues['date'],
                        onChangeText: inputChangedHandler.bind(this, 'date')
                    }} style={styles.rowInput}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    value: inputValues['description'],
                    onChangeText: inputChangedHandler.bind(this, 'description')
                }} />
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
});