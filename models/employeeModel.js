const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/** Employee must have dni, birth_date, firsta_name,
 *  last_name, gender, hire_date
 */

const employeeFields = {
  dni: Number,
  birth_date: Date,
  firsta_name: String,
  last_name: String,
  gender: String,
  hire_date: Date,
};

const employeeSchema = new Schema(employeeFields);

const Employee = mongoose.model("Employee", employeeSchema);

if (!Employee.collection.collection) {
  Employee.createCollection();
}

module.exports = { Employee, employeeFields };
