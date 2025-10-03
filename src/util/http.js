import axios from 'axios';

const BACKEND_URL = 'https://react-native-course-c2c81-default-rtdb.firebaseio.com/';

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');
    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }

    // wait 1 second to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return expenses;

}

export async function updateExpense(id, expenseData) {
    // wait 1 second to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
    // wait 1 second to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}