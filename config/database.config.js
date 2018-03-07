const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://tamdang:mat891432@localhost:5432/myapp'
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:32768/contractms'
module.exports = {
  url: MONGODB_URI
}