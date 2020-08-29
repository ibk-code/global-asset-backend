const UserSignUp = require("../models/signUp");

const increasePerHour = (id, balc) => {
  UserSignUp.findByIdAndUpdate(
    id,
    { balance: balc },
    { useFindAndModify: false },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    }
  );
};

const increasePerDays = (id, balc, updatedDate) => {
  UserSignUp.findByIdAndUpdate(
    id,
    { $set: { balance: balc, "status.lastIncrementedTime": updatedDate } },
    { useFindAndModify: false },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    }
  );
};

exports.beginnerPlan = () => {
  UserSignUp.find({ plan: "Beginner plan" }, (err, arr) => {
    if (arr.length > 0) {
      arr.forEach((e) => {
        const {
          status: { deposit },
        } = e;
        const percent = (10 / 100) * Number(deposit);
        const { balance } = e;
        const newBalance = (Number(balance) + percent).toFixed(2);
        const balcString = newBalance.toString();
        increasePerHour(e._id, balcString);
      });
    } else {
      return;
    }
  });
};

exports.intermediatePlan = () => {
  UserSignUp.find({ plan: "Intermediate plan" }, (err, arr) => {
    if (arr.length > 0) {
      arr.forEach((e) => {
        const now = new Date();
        const nowDate = now.getDate();
        const lastDate = new Date(`${e.status.lastIncrementedTime}`).getDate();
        const pastDate = nowDate - lastDate;
        if (pastDate === 2) {
          const {
            status: { deposit },
          } = e;
          const percent = (16 / 100) * Number(deposit);
          const { balance } = e;
          const newBalance = (Number(balance) + percent).toFixed(2);
          const balcString = newBalance.toString();
          increasePerDays(e._id, balcString, Date.now());
        } else {
          return;
        }
      });
    }
  });
};

exports.advancePlan = () => {
  UserSignUp.find({ plan: "Advance plan" }, (err, arr) => {
    if (arr.length > 0) {
      arr.forEach((e) => {
        const now = new Date();
        const nowDate = now.getDate();
        const lastDate = new Date(`${e.status.lastIncrementedTime}`).getDate();
        const pastDate = nowDate - lastDate;
        if (pastDate === 3) {
          const {
            status: { deposit },
          } = e;
          const percent = (30 / 100) * Number(deposit);
          const { balance } = e;
          const newBalance = (Number(balance) + percent).toFixed(2);
          const balcString = newBalance.toString();
          increasePerDays(e._id, balcString, Date.now());
        } else {
          return;
        }
      });
    }
  });
};

exports.proPlan = () => {
  UserSignUp.find({ plan: "Pro plan" }, (err, arr) => {
    if (arr.length > 0) {
      arr.forEach((e) => {
        const now = new Date();
        const nowDate = now.getDate();
        const lastDate = new Date(`${e.status.lastIncrementedTime}`).getDate();
        const pastDate = nowDate - lastDate;
        if (pastDate === 5) {
          const {
            status: { deposit },
          } = e;
          const percent = (50 / 100) * Number(deposit);
          const { balance } = e;
          const newBalance = (Number(balance) + percent).toFixed(2);
          const balcString = newBalance.toString();
          increasePerDays(e._id, balcString, Date.now());
        } else {
          return;
        }
      });
    }
  });
};
