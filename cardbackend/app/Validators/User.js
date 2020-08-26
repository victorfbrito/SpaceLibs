'use strict'

const Antl = use('Antl')

class User {
  //faz com que todos sejam validados simultaneamente
  get validateAll () {
    return true
  }

  //campos a ser validados
  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
