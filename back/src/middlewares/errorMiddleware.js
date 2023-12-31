function errorMiddleware(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error);
  if (error.status) {
    res.status(error.status).send(error.message);
  } else {
    // 정의되지 않은 Error
    res.status(400).send(error.message);
  }
}

export { errorMiddleware };
