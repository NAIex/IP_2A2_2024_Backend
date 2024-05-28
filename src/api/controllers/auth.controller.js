import AuthService from "../services/auth.services.js";

class authController {
  static register = async (req, res, next) => {
    try {
      const user = await AuthService.register(req.body);
      res.status(200).json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  static login = async (req, res, next) => {
    try {
      const data = await AuthService.login(req.body);
      res.status(200).json({
        status: true,
        message: "Account login successful",
        data,
      });
    } catch (e) {
      console.log(e);
      next(e);
      // res.send(e);
    }
  };

  static generateRandomNames = async (req, res, next) => {
    try {
      const names = await AuthService.generateRandomNames();
      res.status(200).json({
        status: true,
        message: "Random names generated successfully ceva plus",
        data: names,
      });
    } catch (e) {
      next(e);
      console.log(e);
      res.send(e);
    }
  };

  static logout = async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Token is required for logout");
      }
      await AuthService.logout(token);
      res.status(204).send();
    } catch (e) {
      next(e);
      console.log(e);
      res.send(e);
    }
  };

  static all = async (req, res, next) => {
    try {
      const users = await AuthService.all();
      res.status(200).json({
        status: true,
        message: "All users",
        data: users,
      });
    } catch (e) {
      next(e);
      console.log(e);
      res.send(e);
    }
  };
}

export default authController;
