const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const genderTypeEnum = require("./enums/gender.enum");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const employeeModel = require("../models/employeeModel").Employee;

// GraphQL type imports

// Validators
const {
  CheckEmployeeHasLegalAge,
  EmployeeHasConnections,
  DNIAlreadyInUse,
} = require("../validators/employeeType.validator");

// GraphQL library imports
const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
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
  extensions: {
    validations: {
      CREATE: [CheckEmployeeHasLegalAge, DNIAlreadyInUse],
      DELETE: [EmployeeHasConnections],
    },
  },
  fields: () =>
    Object.assign(
      {
        id: { type: GraphQLNonNull(GraphQLID) },
        dni: { type: GraphQLNonNull(GraphQLInt) },
        first_name: { type: GraphQLNonNull(GraphQLString) },
        last_name: { type: GraphQLNonNull(GraphQLString) },
        gender: { type: GraphQLNonNull(genderTypeEnum) },
        birth_date: { type: GraphQLNonNull(GraphQLDate) },
        hire_date: { type: GraphQLNonNull(GraphQLDate) },
      },
      AuditableObjectFields
    ),
});

gnx.connect(employeeModel, employeeType, "Employee", "Employees");

module.exports = employeeType;
