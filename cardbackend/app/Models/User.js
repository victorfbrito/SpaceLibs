"use strict";

const Model = use("Model");
const Hash = use("Hash");

//MODEL DE USUARIO
//automaticamente entende os campos da tabela, nao é preciso declará-los
class User extends Model {
  //static boot = constructor
  static boot() {
    super.boot();

    //CRIPTOGRAFA A SENHA CRIADA/ALTERADA
    this.addHook("beforeSave", async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  //relac. com tokens
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  cards() {
    return this.hasMany("App/Models/Card");
  }
}

module.exports = User;
