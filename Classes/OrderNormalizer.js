'use strict'

class OrderNormalizer {
  constructor (orders) {
    this.orders = orders
  }

  normalize () {
    let normalizer = this

    let normalizedOrders = this.orders.map(function (unnormalizedOrder) {
      let order = {
        orderId: Number(unnormalizedOrder.orderId),
        dealId: Number(unnormalizedOrder.dealId),
        email: normalizer.normalizeEmail(unnormalizedOrder.email),
        street: normalizer.normalizeStreet(unnormalizedOrder.street),
        city: unnormalizedOrder.city.toLowerCase(),
        state: normalizer.normalizeState(unnormalizedOrder.state),
        zipCode: unnormalizedOrder.zipCode,
        creditCard: unnormalizedOrder.creditCard
      }
      return order
    })
    return normalizedOrders
  }

  normalizeEmail (email) {
    let emailSplitted = email.split('@')
    let plusIndex = emailSplitted[0].indexOf('+')
    emailSplitted[0] = emailSplitted[0].replace('.', '')
    if (plusIndex >= 0) {
      emailSplitted[0] = emailSplitted[0].substring(0, plusIndex - 1)
    }
    return emailSplitted.join('@')
  }

  normalizeStreet (street) {
    return street.replace('st.', 'street').replace('rd.', 'road')
  }

  normalizeState (state) {
    return state.replace('il', 'illinois').replace('ca', 'california').replace('ny', 'new york')
  }
}

module.exports = { OrderNormalizer }
