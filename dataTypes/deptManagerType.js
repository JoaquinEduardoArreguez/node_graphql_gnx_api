const graphql = require("graphql");
const gnx = require("@simtlix/gnx");
const gqlDate = require("graphql-iso-date");
const {
  AuditableObjectFields
} = require("./extended_types/auditableGraphQLObjectType");

// MongoDB model imports
const departmentModel = require("../models/departmentModel").Department;
const deptManagerModel = require("../models/deptManagerModel").DeptManager;
const employeeModel = require("../models/employeeModel").Employee;

// GraphQL type imports
const departmentType = require("./departmentType");
const employeeType = require("./employeeType");

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
 * Dept_manager must have employee_id, department_id, from_date, to_date
 */

const deptManagerType = new GraphQLObjectType({
  name: "DepartmentManager",
  description: "Represents a department manager",
  fields:() =>Object.assign(AuditableObjectFields,{
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
        return employeeModel.findById(parent.employee_id);
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
        return departmentModel.findById(parent.department_id);
      },
    },
  }),
});

gnx.connect(
  deptManagerModel,
  deptManagerType,
  "DepartmentManager",
  "DepartmentManagers"
);

module.exports = deptManagerType;
