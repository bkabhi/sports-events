const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const { getTokens } = require("./jwt.controller");

//create user account
const register = async (req, res) => {
  const { firstName, lastName = "", email, password } = req.body;
  if (!firstName || !email || !password)
    return res.status(400).send({ message: "Required Data missing" });
  try {
    let user = await userModel.findOne({email});
    if (user) {
      return res.status(409).send({ message: "An account with this email already exists!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = { firstName, lastName, email, password: hashedPassword }
      let createdUser = await userModel.create(user);
      return res.send({ message: "Account Created", data: createdUser });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
}

// login user 
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send({ message: "Required Data missing" });
  try {
    let user = await userModel.findOne({email});
    console.log(user , " user in loging ");
    if (!user) return res.status(404).send({ message: "User not found"});

    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword, " valid password checks");
    if (validPassword) {
      let payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userid: user._id,
      }
      let { accessToken, refreshToken } = getTokens(payload);
      return res.send({ message: "Login successfull", data: { accessToken, refreshToken } });
    } else {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
}

// refreshToken
const refreshToken =  async (req, res) => {
  try {
    let accessToken = getAccessToken(req.params.refreshToken);
    return res.send({ message: "Access Token generated", data: { accessToken } });
  } catch (error) {
    error.message = "Invalid/Expire refresh token";
    return res.status(400).send({ message: error.message });
  }
}
module.exports = { register, login, refreshToken };
