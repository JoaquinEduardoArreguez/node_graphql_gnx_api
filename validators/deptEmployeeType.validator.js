const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;
/**
 * 7 - Can't be 2 employees assigned to the same department in the same portion of time
 */

const deptEmployee = require("../models/deptEmployeeModel").DeptEmployee;

const CantBeTwoEmployeesInSameDepartmentAtSameTime = {
  validate: async function (typeName, originalObject, materializedObject) {
    const deptEmployeeFound = await deptEmployee.find({
      department_id: materializedObject.department_id,
    });
    // Si son del mismo departamento y distintos empleados

    console.log("INSIDE");

    deptEmployeeFound.forEach(deptEmployeeElem => {

        if (
            deptEmployeeElem &&
            deptEmployeeElem.employee_id != materializedObject.employee_id
          ) {
            console.log("NOT THE SAME EMPLOYEE");
      
            // Las fechas no tienen que ser iguales ni estar contenidas
            if (
              materializedObject.from_date >= deptEmployeeElem.from_date &&
              materializedObject.to_date <= deptEmployeeElem.to_date
            ) {
              throw new CantBeTwoEmployeesInSameDepartmentAtSameTimeError(typeName);
            }
          }
        
    });

    
  },
};

class CantBeTwoEmployeesInSameDepartmentAtSameTimeError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Cant be 2 employees assigned to the same department in the same portion of time",
      "CantBeTwoEmployeesInSameDepartmentAtSameTimeError"
    );
  }
}

module.exports = { CantBeTwoEmployeesInSameDepartmentAtSameTime };
