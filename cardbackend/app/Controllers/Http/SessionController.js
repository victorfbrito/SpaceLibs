'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    //pega email e senha da req
    const { email, password } = request.all()
    //executa auth
    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
