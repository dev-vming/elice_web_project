const passport = require("passport");

const local = require("./strategies/local");
const { User } = require("../db");

module.exports = () => {
  passport.use(local);

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    const user = await User.findById({ _id }); // 여기서 로그인 정보 전용 세션에서 정보를 찾는것이 맞아 보인다...
    done(null, user);
  });
};
