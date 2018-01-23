const parser = require('../Classes/FileParser')
const path = require('path')
const assert = require('assert')
const fs = require('fs')

describe('File Parser', function () {
  it('Should process the one line file', function () {
    let filePath = path.join(__dirname, '../Files', 'FourLines_MoreThanOneFraudulent.txt')
    let result = new parser.FileParser(fs.readFileSync(filePath, 'utf8')).parse()
    assert.ok(result)
    assert.equal(result.length, 4)
  })
})
