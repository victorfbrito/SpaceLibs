"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileSchema extends Schema {
  up() {
    this.create("files", (table) => {
      table.increments();
      table.string("file").notNullable();
      //nome original do arquivo
      table.string("name").notNullable();
      //se é img, pdf, etc
      table.string("type", 20);
      //se é png, jpg, etc
      table.string("subtype", 20);
      table.timestamps();
    });
  }

  down() {
    this.drop("files");
  }
}

module.exports = FileSchema;
