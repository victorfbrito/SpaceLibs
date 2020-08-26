"use strict";

const Card = use("App/Models/Card");
const Invite = use("App/Models/Invite");

class InviteController {
  async store({ request, auth }) {
    const data = request.only(["email", "card"]);
    //try {
    const erro1 = {
      erro: "O card que você está procurando não foi encontrado",
    };
    const erro2 = { erro: "Você não tem permissão para visualizar esse card" };
    //mostra tbm info do user
    try {
      const cardref = await Card.findOrFail(data.card);
      if (cardref.user_id == auth.user.id) {
        const date = cardref.date;
        cardref.date = date.toLocaleString();
        const invite = await Invite.create({ ...data });

        return invite;
      } else {
        return erro2;
      }
    } catch (err) {
      return erro1;
    }
  }
}

module.exports = InviteController;
