import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';

import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

import { storeExpense, updateExpense, deleteExpense } from '../util/http';

import { GlobalStyles } from '../constants/styles';
import ErrorOverlay from '../components/UI/ErrorOverlay';
const { colors } = GlobalStyles;

function ManageExpenses({ route, navigation }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function cancelHandler() {
        navigation.goBack();
    }

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense!');
            setIsSubmitting(false);
        }
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later.');
            setIsSubmitting(false);
        }
    }

    const submitButtonLabel = isEditing ? 'Update' : 'Add';

    if (isSubmitting) {
        return <LoadingOverlay />;
    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
    }

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