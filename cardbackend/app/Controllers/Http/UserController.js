"use strict";

const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  async store({ request }) {
    const data = request.only(["username", "email", "password"]);

    const trx = await Database.beginTransaction();

    const user = await User.create(data, trx);

    await trx.commit();

    //com a flag apionly nao precisa de response pois ao dar return já retorna um json
    return user;
  }

  async index({ request }) {
    //puxa a pagina do objeto pelo paginate
    const { page } = request.get();

    const users = await User.query().paginate(page);

    return users;
  }
}

module.exports = UserController;
