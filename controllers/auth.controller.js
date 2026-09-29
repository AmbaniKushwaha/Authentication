import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const getHomePage = (req, res) => {
  res.render("home");
};

export const getSignup = (req, res) => {
  res.render("auth/signup");
};



export const postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).send("Email already exists!");
    }


  // console.log(name,email,password);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await User.create({
        name: name,
        email: email,
        password: hash,
      });
    });
  });

  let token = jwt.sign({ email: email }, JWT_SECRET );
  res.cookie("email", token);
  res.redirect("/dashboard");

};

export const getLogin = async (req, res) => {
  res.render("auth/login");
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let userInfo = await User.findOne({ email: email });

  if (userInfo) {
    bcrypt.compare(password, userInfo.password, (err, result) => {
      if (!result) {
        return res.send("Invalid Credentials!");
      }
      res.redirect("/dashboard");
    });
  }
  else{
    res.send("You don't have an account !")
  }
};

export const getDashboard = (req, res) => {
  res.render("dashboard");
};
