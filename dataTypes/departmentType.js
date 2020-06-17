const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const {
  AuditableObjectFields,
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const departmentModel = require("../models/departmentModel").Department;

// Validator imports
const CantRepeatName = require("../validators/departmentType.validator").CantRepeatName;
const CantDeleteConnectedDepartment = require("../validators/departmentType.validator").CantDeleteConnectedDepartment;

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
 * Departments must have dept_name
 */

const departmentType = new GraphQLObjectType({
  name: "Department",
  description: "Represents a department",
  extensions: {
    validations: {
      CREATE: [CantRepeatName],
      DELETE: [CantDeleteConnectedDepartment],
    },
  },
  fields: () => Object.assign({
      id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLNonNull(GraphQLString) },
    },AuditableObjectFields),
});

gnx.connect(departmentModel, departmentType, "Department", "Departments");

module.exports = departmentType;
