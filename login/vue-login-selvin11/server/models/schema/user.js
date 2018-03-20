// 새로운 모델 디렉토리를 생성한다. 데이터 모델을 넣는다. 각 데이터 모델은 스키마를 생성해야한다.

// 새로운 movie.js 파일 또는 기타 데이터 모델을 만들어 기본 데이터를 제공합니다.

// 여기에있는 mongo 모델은 응용 프로그램 용입니다.

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    create_time: Date
})


const User = module.exports = mongoose.model('UserSession', userSchema)