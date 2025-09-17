import { View } from 'react-native';

import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-12-17')
    },
    {
        id: 'e3',
        description: 'A nice sweater',
        amount: 49.99,
        date: new Date('2022-12-15')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 19.99,
        date: new Date('2022-12-14')
    },
    {
        id: 'e5',
        description: 'A pair of socks',
        amount: 5.49,
        date: new Date('2022-12-13')
    },
    {
        id: 'e6',
        description: 'A new phone',
        amount: 699.99,
        date: new Date('2022-12-12')
    }
];

function ExpensesOutput({ expenses, expensesPeriod }) {
    return (
        <View>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
}

export default ExpensesOutput;