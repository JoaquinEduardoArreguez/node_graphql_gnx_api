const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Salaries must have empId, salary, from_date, to_date
 */

const salaryFields = {
  empId: Schema.Types.ObjectId,
  salary: Number,
  from_date: Date,
  to_date: Date,
};

const salarySchema = new Schema(salaryFields);

const Salary = mongoose.model("Salary", salarySchema);

if (!Salary.collection.collectionName) {
  Salary.createCollection();
}

module.exports = { salaryFields, Salary };
