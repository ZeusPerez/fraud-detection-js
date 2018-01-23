'use strict'

class OrderCheker {
  constructor (orders) {
    this.orders = orders
  }

  detect () {
    let fraudulentOrders = this.filterFraudulentOrders()
    let fraudResults = fraudulentOrders.map(function (order) {
      let fraudulentResult = {
        isFraudulent: true,
        orderId: order.orderId
      }
      return fraudulentResult
    })
    return fraudResults
  }

  filterFraudulentOrders () {
    let frauds = []
    for (let i = 0; i < this.orders.length - 1; i++) {
      let currentOrder = this.orders[i]
      let subArray = this.orders.slice(i + 1, this.orders.length)

      frauds = frauds.concat(this.searchFraudulentOrders(currentOrder, subArray))
    }
    return frauds
  }

  searchFraudulentOrders () {
    console.log('Redefine searchFraudulentOrders in the subclass')
    return []
  }
}

class EmailChecker extends OrderCheker {
  searchFraudulentOrders (currentOrder, subArray) {
    let partialFrauds = subArray.filter(function (targetOrder) {
      return (currentOrder.dealId === targetOrder.dealId && currentOrder.email === targetOrder.email &&
        currentOrder.creditCard !== targetOrder.creditCard)
    })
    return partialFrauds
  }
}

class AddressChecker extends OrderCheker {
  searchFraudulentOrders (currentOrder, subArray) {
    let partialFrauds = subArray.filter(function (targetOrder) {
      return (currentOrder.dealId === targetOrder.dealId && currentOrder.state === targetOrder.state &&
        currentOrder.zipCode === targetOrder.zipCode && currentOrder.street === targetOrder.street &&
        currentOrder.city === targetOrder.city && currentOrder.creditCard !== targetOrder.creditCard)
    })
    return partialFrauds
  }
}

module.exports = { EmailChecker, AddressChecker }
