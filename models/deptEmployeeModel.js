const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Dept_employee must have empId, deptId, from_date, to_date
 */

const deptEmployeeFields = {
  employee_id: Schema.Types.ObjectId,
  department_id: Schema.Types.ObjectId,
  from_date: mongoose.Schema.Types.Date,
  to_date: mongoose.Schema.Types.Date,
};

const deptEmployeeSchema = new Schema(deptEmployeeFields);

const DeptEmployee = mongoose.model("DeptEmployee", deptEmployeeSchema);

if (!DeptEmployee.collection.collection) {
  DeptEmployee.createCollection();
}

module.exports = { DeptEmployee, deptEmployeeFields };
