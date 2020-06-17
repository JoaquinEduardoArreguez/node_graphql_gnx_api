const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
/**
 * 7 - Can't be 2 department managers assigned to the same department in the same portion of time
 */

const deptManager = require("../models/deptManagerModel").DeptManager;

const CantBeTwoDeptManagersInSameDepartmentAtSameTime = {
  validate: async function (typeName, originalObject, materializedObject) {
    const deptManagerFound = await deptManager.find({
      department_id: materializedObject.department_id,
    });
    // Si son del mismo departamento y distintos manager

    deptManagerFound.forEach((deptEmployeeElem) => {
      if (
        deptEmployeeElem &&
        deptEmployeeElem.employee_id != materializedObject.employee_id
      ) {
        // Las fechas no tienen que ser iguales ni estar contenidas
        if (
          materializedObject.from_date >= deptEmployeeElem.from_date &&
          materializedObject.to_date <= deptEmployeeElem.to_date
        ) {
          throw new CantBeTwoDeptManagersInSameDepartmentAtSameTimeError(
            typeName
          );
        }
      }
    });
  },
};

class CantBeTwoDeptManagersInSameDepartmentAtSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cant be 2 Department Managers assigned to the same department in the same portion of time",
      "CantBeTwoEmployeesInSameDepartmentAtSameTimeError"
    );
  }
}

module.exports = { CantBeTwoDeptManagersInSameDepartmentAtSameTime };
