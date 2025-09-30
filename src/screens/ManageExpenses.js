import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';

import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

import { storeExpense } from '../util/http';

import { GlobalStyles } from '../constants/styles';
const { colors } = GlobalStyles;

function ManageExpenses({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            storeExpense(expenseData);
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    const submitButtonLabel = isEditing ? 'Update' : 'Add';

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} submitButtonLabel={submitButtonLabel} onSubmit={confirmHandler} defaultValues={selectedExpense} />

            {isEditing && <View style={styles.deleteContainer}>
                <IconButton icon="trash" size={36} color={colors.error500} onPress={deleteExpenseHandler} />
            </View>}
        </View>
    );
}

export default ManageExpenses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: colors.primary200,
        alignItems: 'center',
    }
});