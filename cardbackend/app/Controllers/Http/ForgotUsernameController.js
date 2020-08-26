'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotUsernameController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)

      //gera token 10 bytes string hexadecimal
      user.token = crypto.randomBytes(10).toString('hex')
      //nova data (atual)
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['emails.forgot_username'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('victor@email.com',"Victor | Node")
            .subject('Mudar nome de usuário')
      })

    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo não deu certo, esse é mesmo seu e-mail?' }})
    }
  }

  async update ({ request, response }) {
    try {
      const { token, username } = request.all()


      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2','days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: "O token de recuperação está expirado"}})
      }

      user.token = null;
      user.token_created_at = null
      user.username = username

      await user.save()

    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Algo deu errado ao alterar seu nome de usuário"}})
    }

  }
}

module.exports = ForgotUsernameController
