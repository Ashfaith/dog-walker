require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
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
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
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
