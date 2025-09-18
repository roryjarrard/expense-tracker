import { FlatList, Text } from 'react-native';

import ExpenseItem from './ExpenseItem';

function ExpensesList({ expenses }) {
    function renderExpenseItem(itemData) {
        console.log('sending itemData.item: ', itemData.item);
        return (
            <ExpenseItem
                description={itemData.item.description}
                amount={itemData.item.amount}
                date={itemData.item.date}
            />
        );
    }



    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={renderExpenseItem}
        />
    );
}

export default ExpensesList;