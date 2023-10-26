const passport = require("passport");
const local = require("./strategies/local");
const { User } = require("../db/index");

module.exports = () => {
  passport.use(local);

  passport.serializeUser((user, done) => {
    console.log("sericalizeUser 실행", user._id);

    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    console.log("desericalizeUser 실행", _id);
    User.findById({ _id })
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((err) => done(err)); // 여기서 로그인 정보 전용 세션에서 정보를 찾는것이 맞아 보인다...
  });
};
