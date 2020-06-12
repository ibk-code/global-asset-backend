const UserSignUp = require('../models/signUp');

const updateRefer = (id, count, balc) => {
    UserSignUp.findByIdAndUpdate(id, {$set: {referralCount: count,  btcBalance: balc}}, { useFindAndModify: false })
        .then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e)
        })
} 

exports.referred = (id) => {
    const userId = {_id: id}
    UserSignUp.findById(id)
        .then(res => {
            let addedBonus, newBalance, balanceString;
            const {referralCount} = res;
            const updatedCount = referralCount + 1;
            const {btcBalance} = res;
            const {status: {deposit}} = res;
            const {plan} = res;
            if (plan === "A day plan") {
                addedBonus = 5/100 * Number(deposit);
                newBalance = (Number(btcBalance) + addedBonus).toFixed(4);
                balanceString = newBalance.toString();
                console.log(addedBonus)
                console.log(newBalance)
                updateRefer(userId._id, updatedCount, balanceString);
            }else if (plan === "3 days plan") {
                addedBonus = 7/100 * Number(deposit);
                newBalance =(Number(btcBalance) + addedBonus).toFixed(4);
                balanceString = newBalance.toString();
                updateRefer(userId._id, updatedCount, balanceString);
            }else if (plan === "Trader plan" || "Gold plan") {
                addedBonus = 10/100 * Number(deposit);
                newBalance = (Number(btcBalance) + addedBonus).toFixed(4);
                balanceString = newBalance.toString();
                updateRefer(userId._id, updatedCount, balanceString);
            }
        })
}