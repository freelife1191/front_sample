// 모니터 token이 만료되었습니다.
const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ')[1]

    // 해체 token, 객체 생성 { name: xx, iat: xx, exp: xx }
    
    let decoded = jwt.decode(token)
    console.log(decoded)
    // 모니터 token이 만료되었습니다.
    if (token && decoded.exp <= Date.now() / 1000) {
      return res.json({
        code: 401,
        token: false,
        error: 'token이 만료되었습니다. 다시 로그인하십시오.'
      })
    }else{
      return res.json({
        token: true
      })
    }
  }
  
  next();
}