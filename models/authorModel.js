const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorFields = {
  name: mongoose.Schema.Types.String,
};

const authorSchema = new Schema(authorFields);

const Author = mongoose.model("Author", authorSchema);

if (!Author.collection.collection) {
  Author.createCollection();
}
module.exports = { Author, authorFields };
