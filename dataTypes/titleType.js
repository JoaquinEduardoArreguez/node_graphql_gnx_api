const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const titleModel = require("../models/titleModel").Title;
const employeeModel = require("../models/employeeModel").Employee;

// GraphQL type imports
const employeeType = require("./employeeType");

// Validators
const { CheckCoherentDates } = require("../validators/dates.validator");
const { EmployeeRepeatsTitle } = require("../validators/titleType.validator");

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

  extensions: {
    validations: {
      CREATE: [CheckCoherentDates, EmployeeRepeatsTitle],
    },
  },

  fields: () =>
    Object.assign(
      {
        id: { type: GraphQLNonNull(GraphQLID) },
        employee_id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        from_date: { type: GraphQLNonNull(GraphQLDate) },
        to_date: { type: GraphQLNonNull(GraphQLDate) },

        employee: {
          type: employeeType,
          extensions: {
            relation: {
              connectionField: "employee_id",
              embedded: false,
            },
          },
          resolve(parent, args) {
            return employeeModel.findById(parent.employee_id);
          },
        },
      },
      AuditableObjectFields
    ),
});

gnx.connect(titleModel, titleType, "title", "titles");

module.exports = titleType;
