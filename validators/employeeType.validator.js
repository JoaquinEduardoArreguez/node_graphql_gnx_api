const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

// Model imports
const deptManager = require("../models/deptManagerModel").DeptManager;
const deptEmployee = require("../models/deptEmployeeModel").DeptEmployee;
const salary = require("../models/salaryModel").Salary;
const title = require("../models/titleModel").Title;
const employee = require("../models/employeeModel").Employee;

/**
 * 1 - Can't exist more than one employee with the same dni
 * también podría poner en el model de mongoose que el campo dni
 * sea único, lo que sería más fácil pero no daría un mensaje
 * de error personalizado.
 */
const DNIAlreadyInUse = {
  validate: async function (typeName, originalObject, materializedObject) {
    const dni_repeated = await employee.findOne({
      dni: materializedObject.dni,
    });

    if (dni_repeated) {
      throw new DNIAlreadyInUseError(typeName);
    }
  },
};

/**
 * 2 - Employee must have more than 18 years old
 */
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

/**
 * 9 - Can't delete a child from a relation
 */
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

// Custom errors extend GNXError

class EmployeeHasNotLegalAgeError extends GNXError {
  constructor(typeName, age) {
    super(
      typeName,
      `Employee is ${age} years old, has not legal age to work`,
      "CheckEmployeeHasLegalAge"
    );
  }
}

class DNIAlreadyInUseError extends GNXError {
  constructor(typeName) {
    super(typeName, `DNI already in data base`, "DNIAlreadyInUse");
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

module.exports = {
  CheckEmployeeHasLegalAge,
  EmployeeHasConnections,
  DNIAlreadyInUse,
};
