"use strict";

//const moment = require("moment");
const Card = use("App/Models/Card");

class CardController {
  async index({ request, auth }) {
    //puxa a pagina do objeto pelo paginate
    const { reverse, page } = request.get();
    const cards = await Card.query()
      .where({ user_id: auth.user.id })
      .orderBy("created_at", reverse)
      //.with('user')
      .paginate(page, 15);

    return cards;
  }

  async show({ params, auth }) {
    //
    //const card = await Card.find(params.id)
    //return post
    const erro1 = { erro: "O card que você procura não foi encontrado" };
    const erro2 = { erro: "Você não tem permissão para visualizar esse card" };
    try {
      const card = await Card.findOrFail(params.id);
      if (card.user_id == auth.user.id) {
        await card.load("user");
        return card;
      } else {
        return erro2;
      }
    } catch (err) {
      return erro1;
    }
  }

  async store({ request, auth }) {
    const data = request.only(["title", "text", "type", "image"]);
    const card = await Card.create({ ...data, user_id: auth.user.id });
    return card;
  }

  async update({ params, request, auth }) {
    const erro1 = {
      erro: "O card que você está procurando não foi encontrado",
    };
    const erro2 = { erro: "Você não tem permissão para editar este card" };
    try {
      const card = await Card.findOrFail(params.id);
      const data = request.only(["title", "text", "image"]);
      if (card.user_id == auth.user.id) {
        card.merge(data);
        await card.save();
        return card;
      } else {
        return erro2;
      }
    } catch (err) {
      return erro1;
    }
  }

  async destroy({ params, auth }) {
    const erro1 = {
      erro: "O card que você está procurando não foi encontrado",
    };
    try {
      const card = await Card.findOrFail(params.id);
      const erro2 = { erro: "Você não tem permissão para deletar este card" };
      const sucesso = { success: "card deletado" };

      if (card.user_id == auth.user.id) {
        card.delete();
        return sucesso;
      } else {
        return erro2;
      }
    } catch (err) {
      return erro1;
    }
  }
}

module.exports = CardController;
