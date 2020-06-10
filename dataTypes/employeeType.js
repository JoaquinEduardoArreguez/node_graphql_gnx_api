const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");

// MongoDB model imports
const employeeModel = require("../models/employeeModel").Employee;

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

const employeeType = new GraphQLObjectType({
  name: "Employee",
  description: "Represents an employee",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    dni: { type: GraphQLNonNull(GraphQLInt) },
    first_name: { type: GraphQLNonNull(GraphQLString) },
    last_name: { type: GraphQLNonNull(GraphQLString) },
    gender: { type: GraphQLNonNull(GraphQLString) },
    birth_date: { type: GraphQLNonNull(GraphQLDate) },
    hire_date: { type: GraphQLNonNull(GraphQLDate) },
  }),
});

gnx.connect(employeeModel, employeeType, "Employee", "Employees");

module.exports = employeeType;
