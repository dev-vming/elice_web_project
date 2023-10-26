import passport from "passport";
const local = require("./strategies/local");
const { User } = require("../db/index");

module.exports = () => {
  passport.use(local);

  passport.serializeUser((req, user, done) => {
    console.log("sericalizeUser 실행", user);
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    console.log("desericalizeUser 실행", _id);
    User.findById({ _id })
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
