'use strict'

const server = require('./server')
const expect = require('chai').expect

describe('User module', () => {
  describe('"up"', () => {
    it('should export a function', () => {
      expect(server.up).to.be.a('function')
    })
  })
})