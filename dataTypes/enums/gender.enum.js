const graphql = require("graphql");

const { GraphQLEnumType } = graphql;

const GenderTypeEnum = new GraphQLEnumType({
  name: "GendertypeEnum",
  values: {
    M: {
      value: "Masculine",
    },
    F: {
      value: "Femenine",
    },
    O: {
      value: "Other",
    },
  },
});

module.exports = GenderTypeEnum;
