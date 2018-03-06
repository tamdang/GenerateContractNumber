const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://tamdang:mat891432@localhost:5432/myapp'
module.exports = {
  url: DATABASE_URL
}