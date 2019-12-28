const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://tamdang:mat891432@localhost:5432/myapp'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_n6hzqvbw:gqqtbld6v4ihic8nhp3bsg50c0@ds257808.mlab.com:57808/heroku_n6hzqvbw'
console.log(MONGODB_URI)
module.exports = {
  url: MONGODB_URI
}