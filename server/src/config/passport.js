const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const models = require("../db/models");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await models.getUserByEmail(username);

      if (!user) {
        console.log("user not found");
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.pw);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("Deserializing user: ", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Session:", req.session);
  try {
    const user = await models.getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
