import { createContext, useReducer } from 'react';

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
        date: new Date('2025-09-22')
    },
    {
        id: 'e6',
        description: 'A new phone',
        amount: 699.99,
        date: new Date('2022-12-12')
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ id, ...action.payload }, ...state];
        case 'UPDATE':
            const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updateableExpense = state[updateableExpenseIndex];
            const updatedItem = { ...updateableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense({ expenseData }) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, { expenseData }) {
        dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense
    };

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;