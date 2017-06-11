/*
* Please, check the documentation for the Passport - A Node Authetication middleware
* http://passportjs.org/docs
*/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 6});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({ 'email': email }, function(err, user){
    if(err){
      return done(err);
    }
    if(user){
      return done(null, false, { message: 'Email already exists. Please, try with new email.'});
    }

    var newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err, result){
      if(err){
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  req.checkBody('email', 'Invalid email').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({ 'email': email }, function(err, user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false, { message: 'User does not found. Please, try with correct credentials.'});
    }
    // if(!user.validPassword(password)){ //validPassword NOT WORKING FROM THE USER MODEL
    //   return done(null, false, { message: 'Password is wrong. Please, try with correct credentials.'});
    // }
    if(!bcrypt.compareSync(password, user.password)){
      return done(null, false, { message: 'Password is wrong. Please, try with correct credentials.'});
    }
    return done(null, user);
  });
}));
