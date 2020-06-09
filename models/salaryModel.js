const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Salaries must have empId, salary, from_date, to_date
 */

const salaryFields = {
  employee_id: mongoose.Schema.Types.ObjectId,
  salary: mongoose.Schema.Types.Number,
  from_date: mongoose.Schema.Types.Date,
  to_date: mongoose.Schema.Types.Date,
};

const salarySchema = new Schema(salaryFields);

const Salary = mongoose.model("Salary", salarySchema);

if (!Salary.collection.collectionName) {
  Salary.createCollection();
}

module.exports = { Salary, salaryFields };
