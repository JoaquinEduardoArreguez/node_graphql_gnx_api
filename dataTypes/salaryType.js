const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const salaryModel = require("../models/salaryModel").Salary;
const employeeModel = require("../models/employeeModel").Employee;

// GraphQL type imports
const employeeType = require("./employeeType");

// Validators
const { CheckCoherentDates } = require("../validators/dates.validator");

// GraphQL library imports
const { GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLInt } = graphql;

const { GraphQLDate } = gqlDate;

/**
 * Salaries must have empId, salary, from_date, to_date
 */

const salaryType = new GraphQLObjectType({
  name: "Salary",
  description: "Represents a salary",

  extensions: {
    validations: {
      CREATE: [CheckCoherentDates],
    },
  },

  fields: () =>
    Object.assign(
      {
        id: { type: GraphQLNonNull(GraphQLID) },
        employee_id: { type: GraphQLNonNull(GraphQLID) },
        salary: { type: GraphQLNonNull(GraphQLInt) },
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

gnx.connect(salaryModel, salaryType, "salary", "salaries");

module.exports = salaryType;
