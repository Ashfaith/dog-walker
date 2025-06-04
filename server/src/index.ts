const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const usersRouter = require("./routes/usersRouter");
app.use("/usersRouter", usersRouter);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
