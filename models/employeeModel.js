const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Employee must have dni, birth_date, firsta_name,
 *  last_name, gender, hire_date
 */

const employeeFields = {
  dni: mongoose.Schema.Types.Number,
  first_name: mongoose.Schema.Types.String,
  last_name: mongoose.Schema.Types.String,
  gender: mongoose.Schema.Types.String,
  birth_date: mongoose.Schema.Types.Date,
  hire_date: mongoose.Schema.Types.Date,
};

const employeeSchema = new Schema(employeeFields);

const Employee = mongoose.model("Employee", employeeSchema);

if (!Employee.collection.collection) {
  Employee.createCollection();
}

module.exports = { Employee, employeeFields };
