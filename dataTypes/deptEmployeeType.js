const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const {
  AuditableObjectFields
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const deptEmployeeModel = require("../models/deptEmployeeModel").DeptEmployee;

// GraphQL type imports
const employeeType = require("./employeeType");
const departmentType = require("./departmentType");

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

  fields: () =>
    Object.assign(AuditableObjectFields,{
      id: { type: GraphQLNonNull(GraphQLID) },
      employee_id: { type: GraphQLNonNull(GraphQLID) },
      department_id: { type: GraphQLNonNull(GraphQLID) },
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
          return gnx.getModel(employeeType).findById(parent.employee_id);
        },
      },

      department: {
        type: departmentType,
        extensions: {
          relation: {
            connectionField: "department_id",
            embedded: false,
          },
        },
        resolve(parent, args) {
          return gnx.getModel(departmentType).findById(parent.department_id);
        },
      },
    }),
});

gnx.connect(
  deptEmployeeModel,
  deptEmployeeType,
  "DepartmentEmployee",
  "DepartmentEmployees"
);

module.exports = deptEmployeeType;
