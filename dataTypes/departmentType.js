const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const {
  AuditableObjectFields
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const departmentModel = require("../models/departmentModel").Department;
const deptManagerModel = require("../models/deptManagerModel").DeptManager;

// GraphQL type imports
//const deptManagerType = require("./deptManagerType");
//const deptManagerType = require("./deptManagerType");

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
  fields:() =>Object.assign(AuditableObjectFields,{
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

gnx.connect(departmentModel, departmentType, "department", "departments");

module.exports = departmentType;
