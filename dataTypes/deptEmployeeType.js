const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");

// MongoDB model imports
const deptEmployeeModel = require("../models/deptEmployeeModel").DeptEmployee;

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
 * Dept_employee must have employee_id, department_id ,
 * from_date, to_date
 */

const deptEmployeeType = new GraphQLObjectType({
  name: "DepartmentEmployee",
  description: "Represents a department employee",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    employee_id: { type: GraphQLNonNull(GraphQLID) },
    department_id: { type: GraphQLNonNull(GraphQLID) },
    from_date: { type: GraphQLNonNull(GraphQLDate) },
    to_date: { type: GraphQLNonNull(GraphQLDate) },
  }),
});

gnx.connect(
  deptEmployeeModel,
  deptEmployeeType,
  "DepartmentEmployee",
  "DepartmentEmployees"
);

module.exports = deptEmployeeType;
