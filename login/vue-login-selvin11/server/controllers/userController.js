const express = require('express')
const User = require('../models/schema/user')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const sha1 = require('sha1')
const checkLogin = require('../middlewares/checkLogin').checkLogin
const checkNotLogin = require('../middlewares/checkLogin').checkNotLogin

// 등록
const Register = (req, res) => {
  // 사용자 여기에 등록하십시오. 몽구스
  // Entity - Model에 의해 생성되고 데이터를 저장하기 위해 save 메소드를 사용하는 엔티티
  let userRegister = new User({
    name: req.body.name,
    password: sha1(req.body.password) // 암호를 암호화하십시오
  })

  // objectId를 사용자 생성 시간으로 변환합니다.
  // objectId는 각 데이터 행의 _id입니다.
  // ObjectId는 다음 형식의 12 바이트 BSON 유형 데이터입니다.
  // 처음 4 바이트는 타임 스탬프를 나타냅니다.
  // 다음 3 바이트는 컴퓨터 ID입니다.
  // 다음 두 바이트는 프로세스 ID (PID)
  // 마지막 3 바이트는 난수입니다.
  // objectIdToTimestamp의 역할은 타임 스탬프의 처음 4 바이트를 변환하는 것이다.
  userRegister.create_time = moment(objectIdToTimestamp(userRegister._id))
    .format('YYYY-MM-DD HH:mm:ss');

  User.findOne({
      name: (userRegister.name).toLowerCase()
    })
    .then(user => {
      if (user) {
        res.json({
          success: false,
          error: '이 계정은 등록되었습니다.'
        })
      } else {
        userRegister.save((err, user) => {
          if (err) {
            res.json(err)
          } else {
            res.json(user)
          }
        })
      }
    })
    .catch(err => res.json(err))
}

// 로그인
const Login = (req, res) => {
  let userLogin = new User({
    name: req.body.name,
    password: sha1(req.body.password)
  })
  User.findOne({
      name: userLogin.name
    })
    .then(user => {
      if (!user) {
        res.json({
          success: false,
          message: "계정이 존재하지 않습니다."
        })
      } else if (userLogin.password === user.password) {
        var name = req.body.name;
        // 사용자 정보가 기록됩니다. session
        user.password = null;
        req.session.user = user;
        res.json({
          success: true,
          message: "로그인 성공",
          // session: req.session,
          name: user.name,
          // 계정 생성 일
          time: moment(objectIdToTimestamp(user._id))
            .format('YYYY-MM-DD HH:mm:ss')
        })
      } else {
        res.json({
          success: false,
          message: "잘못된 암호"
        })
      }
    })
    .catch(err => res.json(err))
}

// 모든 사용자가 인쇄
// const UserList = (req, res) => {
//   User.find({

//   })
//     .then(user=>{
//       if (user.length !== 0) {
//         res.json(user)
//       }else{
//         res.json({
//           message: "데이터베이스가 비어 있습니다"
//         })
//       }
//     })
//     .catch(err=>res.json(err))
// }

// get user Session
const getSession = (req, res) => {
  res.json({
    session: true // 프런트 엔드 확인 session이 존재하는지 여부 제공
  })
}

// delete user session
const delSession = (req, res) => {
  req.session.user = null;
  res.json({
    message: '성공적으로 로그 아웃하십시오.'
  })
}



// 사용자 삭제
const delUser = (req, res) => {
  User.findOneAndRemove({
    _id: req.body.id
  }, err => {
    if (err) console.log(err)
    console.log('사용자를 성공적으로 삭제하십시오')
    res.json({
      success: true
    })
  })
}

module.exports = (router) => {
  router.post('/register', checkNotLogin, Register),
    router.post('/login', checkNotLogin, Login),
    router.get('/user', checkLogin, delSession),
    router.get('/', checkLogin, getSession)
}