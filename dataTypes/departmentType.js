const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

// MongoDB models
const DepartmentModel = require("../models/departmentModel").Department;

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const DepartmentType = new GraphQLObjectType({
  name: "DepartmentType",
  description: "Represents a department",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

gnx.connect(DepartmentModel,DepartmentType, "department", "departments");

module.exports = DepartmentType;
