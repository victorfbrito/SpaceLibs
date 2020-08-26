"use strict";

const Antl = use("Antl");

class Card {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: "required",
      text: "required",
      type: "required",
      image: "required",

      // validation rules
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Card;
