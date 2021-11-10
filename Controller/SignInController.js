const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const sendEmail = require("../email");
const brypt = require("bcrypt");
let token;

// CREATE TOKEN
function createToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
}

//POST- SIGNIN USERS
exports.CreateNewUser = async (req, res) => {
  const { email, username, password, verify_password } = req.body;
  const data = { email, username, password, verify_password };
  try {
    const createUser = await User.create(data);
    token = createToken(createUser.id);
    res.status(201).json({
      message: "created successfully",
      token,
      createUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error,
      message: "not created ",
    });
  }
};

//POST- LOGIN USERS
exports.loginIn = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).json({
      message: "username and password are empty",
    });
  }
  try {
    const isUser = await User.findOne({
      where: { username },
    });
    token = createToken(isUser.id);
    // console.log(await brypt.compare(password, isUser.password));
    if (isUser && (await brypt.compare(password, isUser.password))) {
      return res.status(200).json({
        message: "found",
        isUser,
        token: token,
      });
    }
    else {
      return res.status(404).json({
        message: "Incorrect username or password ",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Incorrect username or password ",
    });
  }
};

//PASSWORD RESET- SEND OTP
exports.resetPasswordSendOtp = async (req, res) => {
  const { email } = req.body;

  const isEmailThere = await User.findOne({
    where: {
      email,
    },
  });

  if (isEmailThere) {
    const otp = isEmailThere.passwordResetOTP();
    console.log({ otp });
    await isEmailThere.save();
    try {

      await sendEmail({
        email,
        subject: "Password Reset",
        message: `Dear User, your one time password is ${otp}`
      });

    } catch (error) {
      res.status(404).json({ error })
    }
    res.end();
  }
  else if (isEmailThere === null) {
    res.json({
      message: "there is no such email"
    })
  }
};

//PASSWORD RESET- RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { otp, password, verify_password } = req.body;
  try {
    const isOtp = await User.findOne({
      where: {
        otp,
      },
    });
    console.log(isOtp);

    if (isOtp) {
      try {
        await User.update({ password, verify_password, otp: "" }, { where: { otp } })
        console.log("updated");
        return res.status(201).json({
          message: "password updated",
        })

      } catch (error) {
        res.status(404).json({
          message: "passwords do not match"
        })

      }
    }
    else {
      res.status(404).json({
        message: "otp was not match"
      })
    }
  } catch (error) {
    res.status(404).json({
      message: "something went wrong"
    })
  }
};

//GET USER BY EMAIL
exports.getUserByEmail = async (req, res) => {
  const { email } = req.params
  const user = await User.findOne({ where: { email } })
  if (user) {
    return res.status(302).json({
      user
    })
  }
  res.status(401).json({
    message: `there is no user of ${email}`
  })

}
//GET USER BY USERNAME
exports.getUserByUsername = async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ where: { username } })
  if (user) {
    return res.status(201).json({
      user
    })
  }
  res.status(401).json({
    message: `there is no user of ${username}`
  })

}



//PROTECT MIDDELEWARE
exports.protect = async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;
  //   console.log(auth, auth.startsWith("Bearer"), auth.split(" ")[1]);

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: " please login to get access" });
    }
  }
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const id = decoded.id;

    const isUser = await User.findOne({
      where: { id: decoded.id },
    });
    if (!isUser) {
      res.status(404).json({
        message: "user does not exisit",
      });
    }
    next();
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};
