const UserSignUp = require('../models/signUp')

const increasePerHour = (id, balc) => {
    UserSignUp.findByIdAndUpdate(id, {btcBalance: balc}, { useFindAndModify: false }, (err, res) => {
        if (err) {
            console.log(err);
        }else{
            console.log(res)
        }
    })
}

const increasePerDays = (id, balc, updatedDate) => {
    UserSignUp.findByIdAndUpdate(id, {$set: {btcBalance: balc, "status.lastIncrementedTime": updatedDate}}, { useFindAndModify: false }, (err, res) => {
        if (err) {
            console.log(err);
        }else{
            console.log(res)
        }
    })
}

exports.dayPlan = () => {
    UserSignUp.find({plan: 'A day plan'}, (err, arr) => {
        if(arr.length > 0){
            arr.forEach((e) => {
                const {status: {deposit}} = e;
                const percent = 7/100 * Number(deposit);
                const {btcBalance} = e;
                const newBalance = (Number(btcBalance) + percent).toFixed(4);
                const balcString = newBalance.toString()
                increasePerHour(e._id, balcString)
            })
        }else{
            return
        }
    })
}

exports.threeDaysPlan = () => {
    UserSignUp.find({plan: '3 days plan'}, (err, arr) => {
        if(arr.length > 0){
            arr.forEach((e) => {
                const now = new Date()
                const nowDate = now.getDate();
                const lastDate = new Date(`${e.status.lastIncrementedTime}`).getDate();
                const pastDate = nowDate - lastDate
                if (pastDate === 3) {
                    const {status: {deposit}} = e;
                    const percent = 25/100 * Number(deposit);
                    const {btcBalance} = e;
                    const newBalance = (Number(btcBalance) + percent).toFixed(4);
                    const balcString = newBalance.toString();
                    increasePerDays(e._id, balcString, Date.now())
                }else{
                    return;
                }
            })
        }
    })
}

exports.goldPlan = () => {
    UserSignUp.find({plan: 'Gold plan'}, (err, arr) => {
        if(arr.length > 0){
            arr.forEach((e) => {
                const {status: {deposit}} = e;
                const percent = 20/100 * Number(deposit);
                const {btcBalance} = e;
                const newBalance = (Number(btcBalance) + percent).toFixed(4);
                const balcString = newBalance.toString();
                increasePerHour(e._id, balcString)
            })
        }else{
            return
        }
    })
}

exports.traderPlan = () => {
    UserSignUp.find({plan: 'Trader plan'}, (err, arr) => {
        if(arr.length > 0){
            arr.forEach((e) => {
                const now = new Date()
                const nowDate = now.getDate();
                const lastDate = new Date(`${e.status.lastIncrementedTime}`).getDate();
                const pastDate = nowDate - lastDate
                if (pastDate === 21) {
                    const {status: {deposit}} = e;
                    const percent = 80/100 * Number(deposit);
                    const {btcBalance} = e;
                    const newBalance = (Number(btcBalance) + percent).toFixed(4);
                    const balcString = newBalance.toString();
                    increasePerDays(e._id, balcString, Date.now())
                }else{
                    return;
                }
            })
        }
    })
}