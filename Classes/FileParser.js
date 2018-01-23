'use strict'

class FileParser {
  constructor (fileContent) {
    this.fileContent = fileContent
  }

  parse () {
    let orders = []

    let lines = this.fileContent.split('\n')

    for (let line of lines) {
      let items = line.split(',')
      let order = {
        orderId: items[0],
        dealId: items[1],
        email: items[2],
        street: items[3],
        city: items[4],
        state: items[5],
        zipCode: items[6],
        creditCard: items[7]
      }
      orders.push(order)
    }
    return orders
  }
}

module.exports = { FileParser }
