const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

// Model imports
const deptManager = require("../models/deptManagerModel").DeptManager;
const deptEmployee = require("../models/deptEmployeeModel").DeptEmployee;
const salary = require("../models/salaryModel").Salary;
const title = require("../models/titleModel").Title;

class EmployeeHasNotLegalAgeError extends GNXError {
  constructor(typeName, age) {
    super(
      typeName,
      `Employee is ${age} years old, has not legal age to work`,
      "CheckEmployeeHasLegalAge"
    );
  }
}

class EmployeeHasConnectionsError extends GNXError {
  constructor(typeName, message) {
    super(
      typeName,
      `Employee ${message}, delete that association first.`,
      "EmployeeHasConnections"
    );
  }
}

const EmployeeHasConnections = {
  validate: async function (typeName, originalObject, materializedObject) {
    const isDeptManager = await deptManager.findOne({
      employee_id: originalObject,
    });
    const isDeptEmployee = await deptEmployee.findOne({
      employee_id: originalObject,
    });
    const hasSalary = await salary.findOne({ employee_id: originalObject });
    const hasTitle = await title.findOne({ employee_id: originalObject });

    if (isDeptManager) {
      throw new EmployeeHasConnectionsError(typeName, "is Department Manager");
    }
    if (isDeptEmployee) {
      throw new EmployeeHasConnectionsError(typeName, "is Department Employee");
    }
    if (hasSalary) {
      throw new EmployeeHasConnectionsError(typeName, "has salary associated");
    }
    if (hasTitle) {
      throw new EmployeeHasConnectionsError(typeName, "has title associated");
    }
  },
};

const CheckEmployeeHasLegalAge = {
  validate: async function (typeName, originalObject, materializedObject) {
    const birth_date = new Date(materializedObject.birth_date);
    const actual_date = new Date();

    age = actual_date.getFullYear() - birth_date.getFullYear();
    age += (actual_date.getMonth() - birth_date.getMonth()) / 12;

    if (age < 18) {
      throw new EmployeeHasNotLegalAgeError(typeName, age);
    }
  },
};

module.exports = { CheckEmployeeHasLegalAge, EmployeeHasConnections };
