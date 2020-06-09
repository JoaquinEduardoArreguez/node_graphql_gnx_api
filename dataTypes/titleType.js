const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");

// MongoDB model imports
const titleModel = require("../models/titleModel").Title;

// GraphQL type imports

// GraphQL library imports
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = graphql;

const { GraphQLDate } = gqlDate;

/**
 * Titles must have empId, title, from_date, to_date
 */

const titleType = new GraphQLObjectType({
  name: "Title",
  description: "Represents an employee title",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    employee_id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    from_date: { type: GraphQLNonNull(GraphQLDate) },
    to_date: { type: GraphQLNonNull(GraphQLDate) },
  }),
});

gnx.connect(titleModel,titleType,"title","titles");

module.exports=titleType;