const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Dept_manager must have empId, deptId, from_date, to_date
 */

const deptManagerFields = {
  employee_id: Schema.Types.ObjectId,
  department_id: Schema.Types.ObjectId,
  from_date: mongoose.Schema.Types.Date,
  to_date: mongoose.Schema.Types.Date,
};

const deptManagerSchema = new Schema(deptManagerFields);

const DeptManager = mongoose.model("DeptManager", deptManagerSchema);

if (!DeptManager.collection.collection) {
  DeptManager.createCollection();
}

module.exports = { DeptManager, deptManagerFields };
