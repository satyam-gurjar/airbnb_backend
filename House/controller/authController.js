const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const user = require('../models/user');



exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    currentPage: 'login',
    isLoggedIn: false,
    errors: [],
    oldInput: {email: ''},
    user: {},

  });
}

exports.getSignUp = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'signup',
    currentPage: 'signup',
    isLoggedIn: false,
    errors: [],
    oldInput: "",
    user: {},
  });
}

exports.postLogin = async (req, res, next) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
     return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        currentPage: 'login',
        isLoggedIn: false,
        errors: ['user does not exist'],
        oldInput: {email},
        user: {},
      });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) {
    return res.status(422).render('auth/login', {
        pageTitle: 'Login',
        currentPage: 'login',
        isLoggedIn: false,
        errors: ['Invalid Password'],
        oldInput: {email},
        user: {},
      });
  }
  // Avoid storing mongoose document (with BSON types) in the session to prevent BSON version mismatch errors
  req.session.isLoggedIn = true;
  req.session.user = {
    id: user._id.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType
  };

  // Ensure session is saved before redirect
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

exports.postSignUp = [

  check("email")
    .isEmail()
    .withMessage('please enter a valid email')
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage('please should be at least 8 characters loong')
    .matches(/[A-Z]/)
    .withMessage('password containt at least one uppercaseletter')
    .matches(/[a-z]/)
    .withMessage('password containt at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('password contiant at least one number')
    .matches(/[!@#$%^&*()]/)
    .withMessage('password containt at least one special character')
    .trim(),

  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password do not match');
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage('Please select a user type')
    .isIn(['guest', 'host'])
    .withMessage('Invalid user type'),

  check('term')
    .notEmpty()
    .withMessage('Please accept the term and conditions')
    .custom((value, { req }) => {
      if (value !== 'on') {
        throw new Error('Please accept the term and condition')
      }
      return true;
    }),


  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        pageTitle: 'signup',
        currentPage: 'signup',
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {firstName, lastName, email, password, userType},
        user: {},
      })
    }

    bcrypt.hash(password, 12).then(hashedPassword => {
      const user = new User({firstName,lastName,email, password:hashedPassword, userType});
      return user.save();
    })
    .then(() => {
      res.redirect('/login');
    }).catch(err => {
      return res.status(422).render("auth/signup",{
        pageTitle: 'signup',
        currentPage: 'signup',
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          userType
        },
        user: {},
      })
    })

   
  }
]


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
  // res.cookie('isLoggedIn',false); 
}