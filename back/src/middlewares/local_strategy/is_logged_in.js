function is_logged_in(req, res, next) {
  console.log("패스포트 로그인", req.isAuthenticated());
  if (req.isAuthenticated()) {
    // console.log("inside is_logged_in req.user", req.user);
    // console.log("inside is_logged_in req.session", req.session);
    next(); // 다음 미들웨어
  } else {
    // console.log("inside is_logged_in req.user", req.user);
    // console.log("inside is_logged_in req.session", req.session);
    res.status(403).send("passport: 로그인 필요");
  }
}

export { is_logged_in };
