const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

const Author = require("../models/authorModel").Author;
const BookModel = require("../models/bookModel").Book;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "BookType",
  description: "Represent books",
  fields:() =>Object.assign(AuditableObjectFields,{
    id: { type: GraphQLID },
    name: { type: GraphQLString },

    author: {
      type: AuthorType,
      extensions: {
        relation: {
          connectionField: "AuthorID",
        },
      },
      resolve(parent, args) {
        return Author.findById(parent.AuthorID);
      },
    },
  }),
});

gnx.connect(BookModel, BookType, "book", "books");

module.exports = BookType;

const AuthorType = require("./authorType");
