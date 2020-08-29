const express = require("express");
const router = express.Router();

const adminCtrl = require("../controllers/adminquery");
const adminLogin = require("../controllers/AdminLogin");
const updateUserBtc = require("../controllers/Updatebtc");
const queryAdmin = require("../controllers/adminupdate");

router.post("/user", adminCtrl.singleUser);
router.get("/allusers", adminCtrl.userQuery);
router.get("/adminaddress", adminCtrl.queryAdminAddress);
router.post("/login", adminLogin.login);
router.put("/updatebtc", updateUserBtc.UpdateBalance);
router.put("/updateplan", updateUserBtc.UpdatePlan);
router.put("/updatewithdraw", updateUserBtc.UpdateWithdraw);
router.get("/adminWallet", queryAdmin.queryAdminWallet);
router.post("/adminWalletUpdate", queryAdmin.updateAdminWallet);
router.get("/adminWithdrawstatus", queryAdmin.queryWithdraw);
router.get("/adminChangeWithdrawstatus", queryAdmin.changeWithdraw);

module.exports = router;
