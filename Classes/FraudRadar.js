'use strict'
const parser = require('./FileParser')
const normalizer = require('./OrderNormalizer')
const checker = require('./OrderChecker')

class FraudRadar {
  constructor (fileContent) {
    this.fileContent = fileContent
  }

  check () {
    let parsedOrders = new parser.FileParser(this.fileContent).parse()
    let normalizedOrders = new normalizer.OrderNormalizer(parsedOrders).normalize()
    let emailFrauds = new checker.EmailChecker(normalizedOrders).detect()
    let addressFrauds = new checker.AddressChecker(normalizedOrders).detect()
    return this.removeDuplicates(emailFrauds.concat(addressFrauds))
  }

  removeDuplicates (array) {
    let uniqueArray = []
    for (let i = 0; i < array.length; i++) {
      let duplicates = array.slice(i + 1, array.lenght).filter(function (element) {
        return array[i].orderId === element.orderId
      })
      if (duplicates.length === 0) {
        uniqueArray.push(array[i])
      }
    }
    return uniqueArray
  }
}

module.exports = { FraudRadar }
