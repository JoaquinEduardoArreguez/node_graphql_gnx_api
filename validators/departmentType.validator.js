const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

const { Department } = require("../models/departmentModel");

//const departmentModel = require("../models/departmentModel").Department;
const departmentEmployeeModel = require("../models/deptEmployeeModel")
  .DeptEmployee;
const departmentManagerModel = require("../models/deptManagerModel")
  .DeptManager;

/**
 * 1 - Can't exist more than one employee with the same dni
2 - Employee must have more than 18 years old
3 - In all the collections from_date must be smaller than to_date
4 - The same employee cannot have 2 titles with the same dept_name
5 - Gender must be implemented as Enum
6 - Cant't be 2 departments with the same dept_name
7 - Can't be 2 employees assigned to the same department in the same portion of time
8 - Can't be 2 managers assigned to the same department in the same portion of time
9 - Can't delete a child from a relation 

 */

/**
 * 6 - Cant't be 2 departments with the same dept_name
 */
const CantRepeatName = {
  validate: async function (typeName, originalObject, materializedObject) {
    const departmentFound = await Department.findOne({
      name: materializedObject.name,
    });

    if (departmentFound && departmentFound._id != materializedObject.id) {
      throw new CantUpdateWithNameAlreadyInUseError(typeName);
    }
  },
};

/**
 * 9 - Can't delete a child from a relation
 */
const CantDeleteConnectedDepartment = {
  validate: async function (typeName, originalObject, materializedObject) {
    const departmentEmployeeFound = await departmentEmployeeModel.findOne({
      department_id: originalObject,
    });
    if (departmentEmployeeFound) {
      throw new CantDeleteConnectedDepartment(
        typeName,
        `${typeName} Cant delete, department has department_employee associated`
      );
    } else {
      const departmentManagerFound = await departmentManagerModel.findOne({
        department_id: originalObject,
      });
      if (departmentManagerFound) {
        throw new CantDeleteConnectedDepartment(
          typeName,
          `${typeName} Cant delete , department has department_manager associated`
        );
      }
    }
  },
};

// Custom errors extend GNXError

class CantUpdateWithNameAlreadyInUseError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      `${typeName} name already in use`,
      "CantUpdateWithNameAlreadyInUseError"
    );
  }
}

class CantDeleteConnectedDepartmentError extends GNXError {
  constructor(typeName, message) {
    super(typeName, message, "CantDeleteConnectedDepartmentError");
  }
}

module.exports = {
  CantRepeatName,
  CantDeleteConnectedDepartment,
};
