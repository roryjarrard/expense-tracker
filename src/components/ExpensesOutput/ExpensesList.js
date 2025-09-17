import { FlatList, Text } from 'react-native';

function ExpensesList({ expenses }) {
    function renderExpenseItem(itemData) {
        return <Text>{itemData.item.description} - ${itemData.item.amount.toFixed(2)}</Text>;
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