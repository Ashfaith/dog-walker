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
const { isAdmin } = require("./helpers");
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 3000;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ error: "Authentication required" });
    res.redirect("/login");
  }
}

function adminAuth(req, res, next) {
  if (!isAdmin(req.user)) {
    return res.status(401).json({ message: "Not Authorised" });
  } else {
    next();
  }
}

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
app.use("/users", ensureAuthenticated, userRoutes);
app.use("/dashboard", ensureAuthenticated, dashboardRoutes);
app.use("/followers", ensureAuthenticated, followerRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
