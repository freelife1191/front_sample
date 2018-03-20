const pkg = require('./package')
const config = require('./server/db/dbconfig')
const express = require('express')
const session = require('express-session')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
  
// const MongoStore = require('connect-mongo')(session);

const index = require('./server/router/index') // localhost:3000/
// session메커니즘user
const user = require('./server/router/user')

// token메커니즘user
const usertoken = require('./server-token/router/usertoken')

const db = mongoose.connect(config.mongodb);
// 데이터베이스 연결
db.connection.on("error", function(error) {
  console.log("데이터베이스 연결 실패：" + error);
});
db.connection.on("open", function() {
  console.log("------데이터베이스 연결에 성공했습니다.！------");
});
// Use native promises
mongoose.Promise = global.Promise

const app = express()
const port = process.env.PORT || 3000


// url구문 분석 요청
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// favicon
app.use(favicon(__dirname + '/src/assets/favicon.ico'))

// 정적 리소스
app.use(express.static('dist'))

// session
app.use(session({
  secret: 'usersession',
  key: 'usersession',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000 // 30 초 동안 cookie 노화를 다시 설정하고 테스트합니다.
  }
  // store: new MongoStore({
  //   url: "mongodb://localhost:27017/usersession"
  // })
}))

// 경로 설정
app.use('/', index)
app.use('/api', user)
app.use('/api/token', usertoken)

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
})