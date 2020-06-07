const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Departments must have dept_name
 */

const departmentFields = {
  name: String,
};

const departmentSchema = new Schema(departmentFields);

const Department = mongoose.model("Department", departmentSchema);

if (!Department.collection.collection) {
  Department.createCollection();
}

module.exports = { Department, departmentFields };
