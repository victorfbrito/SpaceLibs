"use strict";

const Schema = use("Schema");

class CardSchema extends Schema {
  up() {
    this.create("cards", (table) => {
      table.increments();
      table
        .integer("user_id")
        //unsigned = apenas valores positivos
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("title").notNullable();
      table.text("text").notNullable();
      table.text("image").notNullable();
      table.string("type").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("cards");
  }
}

module.exports = CardSchema;
