const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");

// MongoDB model imports
const deptManagerModel = require("../models/deptManagerModel").DeptManager;

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
 * Employee must have dni, birth_date, firsta_name,
 * last_name, gender, hire_date
 */