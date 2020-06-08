const graphql = require("graphql");
const gnx = require("@simtlix/gnx");

// MongoDB model imports
const employeeModel = require('../models/employeeModel').Employee;
const salaryModel = require('../models/salaryModel').Salary;
const titleModel = require('../models/titleModel').Title;

// GraphQL type imports