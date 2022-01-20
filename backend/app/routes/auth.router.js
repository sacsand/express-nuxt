const isAuth = require("../middleware/isAuth");

module.exports = (app) => {
  const { Router } = require("express");
  const authRouter = Router();
  const authController = require("../controllers/auth.controller");

  authRouter.post("/signin", authController.postSignIn);
  authRouter.post("/login", authController.postLogin);
  authRouter.post("/refresh-token", authController.postRefreshToken);
  authRouter.post("/users", isAuth, authController.getAllUsers); // you should add isAuth for those routes that you gonna protect them

  authRouter.get("/user", isAuth, authController.getUser);

  app.use("/api/auth/", authRouter);
};
