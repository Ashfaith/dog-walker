require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/usersRouter");
const dashboardRoutes = require("./routes/dashboardRoutes");
const followerRoutes = require("./routes/followerRoutes");
const { ensureAuthenticated, adminAuth } = require("./middleWare");
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/admin", ensureAuthenticated, adminAuth, adminRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/followers", ensureAuthenticated, followerRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
