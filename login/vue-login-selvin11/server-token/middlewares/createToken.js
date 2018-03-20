// token 만들기
var jwt = require('jsonwebtoken')

module.exports = function(name) {
    const token = jwt.sign({
            name: name
        },
        'secret', {
            expiresIn: '10s' // 테스트 기간
        });

    return token;
}