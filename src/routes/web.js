require("dotenv").config();
import express from "express";
import loginController from "../controllers/loginController";
import signupController from "../controllers/signupController";
import homePageController from "../controllers/homeController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import connection from "../configs/connectDB";
import profileController from "../controllers/profileController";
import contactusController from "../controllers/contactusController";
import addsourceController, {getsourcePage} from "../controllers/addsourceController";

let router = express.Router();

initPassportLocal();

router.get("/", loginController.checkLoggedIn, homePageController.getHomePage);

router.get(
  "/login",
  loginController.checkLoggedOut,
  loginController.getLoginPage
);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: true,
    failureFlash: true,
  })
);
router.get("/signup", signupController.getsignupPage);
router.post("/signup", auth.validateSignup, signupController.createNewUser);
router.get("/addsource", (req, res) => {
  res.render("addsource", { message: null });
});
router.get("/addexpenses", (req, res) => {
  res.render("category.ejs");
});

//income
router.get("/income", function (req, res, next) {

let incomeTypes =  "SELECT id FROM incometype WHERE incometype = '$incometype'"
  
  res.render("income", { incomeTypes: incomeTypes });

  
  res.render("income");
});
router.get("/home", function (req, res, next) {
  res.render("home");
});

router.post("/income", function (req, res, next) {
  var date = req.body.date || null;
  var source = req.body.source || null;
  var description = req.body.description || null;
  var amount = req.body.amount || null;

  var sql = `INSERT INTO income (date, source, description, amount) VALUES (${date}, ${source}, ${description}, ${amount})`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    // req.flash("success", "Data added successfully!");
    res.render("addsource", { message: "Data added successfully!" });
  });
});

//expenses
router.get("/expenses", function (req, res, next) {
  res.render("expenses");
});
router.get("/home", function (req, res, next) {
  res.render("home");
});

router.post("/expenses", function (req, res, next) {
  var date = req.body.date;
  var category = req.body.Category;
  var description = req.body.description;
  var amount = req.body.amount;

  var sql = `INSERT INTO expense (date, category,  description, amount) VALUES ("${date}", "${category}", "${description}", "${amount}")`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    req.flash("success", "Data added successfully!");
    res.redirect("/home");
  });
});

router.get("/profile", profileController.getProfilePage);
router.get("/contactus", contactusController.getContactPage);
router.get(
  "/addsource",
  addsourceController.getsourcePage,
  addsourceController.addSource
);

router.post("/logout", loginController.postLogOut);

module.exports = router;
