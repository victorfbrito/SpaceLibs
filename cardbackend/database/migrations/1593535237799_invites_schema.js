"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class InvitesSchema extends Schema {
  up() {
    this.create("invites", (table) => {
      table.increments();
      table
        .integer("user_id")
        //unsigned = apenas valores positivos
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("email").notNullable();
      table.integer("card").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("invites");
  }
}

module.exports = InvitesSchema;
