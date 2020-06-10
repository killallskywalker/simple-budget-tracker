const calculateAmount = (data,transactionType) => {
    return data.filter(transaction => transaction.transactionType === transactionType)
    .reduce((total, transactionAmount) => total +  transactionAmount.total, 0);
}

const calculateRecurring = (data) => {
    if(data){
        return data.reduce((total, transactionAmount) => total +  transactionAmount.total, 0);
    }else{
        return 0;
    }
}

module.exports = {
    calculateAmount,
    calculateRecurring
}