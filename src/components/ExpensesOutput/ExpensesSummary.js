import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
const { colors } = GlobalStyles;

function ExpensesSummary({ periodName, expenses }) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>Total: ${expensesSum.toFixed(2)}</Text>
        </View>
    );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 14,
        color: colors.primary400,
    },
    sum: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary500,
    },
});