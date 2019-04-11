const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    } else {
      const avatar = "https://forum.appzillon.com/styles/comboot/theme/images/default_avatar.jpg"

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        follow:[],
        followers:[]
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then(user => {res.json(user)})
            .catch(err => console.log(err))
        })
      })
    }
  })
})
router.post('/profile_pic',(req,res)=>{
  const url = req.body.url
  const user_id = req.body.id
  User.findOneAndUpdate({_id:user_id},{
    avatar:url
  },(err,user)=>{
    if(err) console.log(err)
    res.json(user)
  }).catch(err=>res.status(442).json(err))
})
// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar,followers:user.followers,follow:user.follow }  // Create JWT Payload

          // Sign Token
          jwt.sign(payload, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
        } else {
          errors.password = 'Password incorrect'
          return res.status(400).json(errors)
        }
      })
    })
    .catch(err => res.json(err))
})
router.get('/get_user/:id',(req,res)=>{
  User.findOne({_id:req.params.id})
      .then(user=>{
        const payload = { id: user.id, name: user.name, avatar: user.avatar,followers:user.followers,follow:user.follow }  // Create JWT Payload

          // Sign Token
          jwt.sign(payload, keys.secretOrkey, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
      })
})
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})
router.post('/follow',(req,res)=>{
  User.findOneAndUpdate({_id:req.body.user_id},
    {
      $push:{follow:{id:req.body.dev_id,isNotBlockedMe:true}}
    }).then(user=>{
      User.findOneAndUpdate({_id:req.body.dev_id},{
        $push:{followers:{id:req.body.user_id,isNotBlocked:true}}
      }).then(result=>{
        res.json(user)
      })
    })
  
})
router.post('/unfollow',(req,res)=>{
  User.findOneAndUpdate({_id:req.body.user_id},
    {
      $pull:{follow:{id:req.body.dev_id}}
    }).then(user=>{
      User.findOneAndUpdate({_id:req.body.dev_id},{
        $pull:{followers:{id:req.body.user_id}}
      }).then(result=>{
        res.json(user)
      })
    })
  
})
router.post('/block',(req,res)=>{
  User.findOneAndUpdate({_id:req.body.dev_id},
    {
      $pull:{follow:{id:req.body.user_id}}
    }).then(result=>{

      User.findOneAndUpdate({_id:req.body.user_id},{
        $pull:{followers:{id:req.body.dev_id}}
      }).then(user=>{
        res.json(user)
      })
    })
  
})
module.exports = router
