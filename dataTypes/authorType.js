const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const Author = require("../models/authorModel").Author;
const Book = require("../models/bookModel").Book;

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: "AuthorType",
  description: "Represent authors",
  fields: () => ({
    id: { type: GraphQLID },

    name: { type: GraphQLString },


    
    books: {
      type: new GraphQLList(BookType),
      extensions: {
        relation: {
          embedded: false,
          connectionField: "AuthorID",
        },
      },
      resolve(parent, args) {
        return Book.find({ AuthorID: parent.id });
      },
    },




  }),
});

gnx.connect(Author, AuthorType, "author", "authors");

module.exports = AuthorType;

const BookType = require("./bookType");
