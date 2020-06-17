const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

// Model imports
const titleModel = require("../models/titleModel").Title;
//const employeeModel = require("../models/employeeModel").Employee;

/**
 * 4 - The same employee cannot have 2 titles with the same dept_name
 * I assume that it was :
 * "The same employee cannot have 2 titles with the same name"
 */
const EmployeeRepeatsTitle = {
  validate: async function (typeName, originalObject, materializedObject) {
    console.log("INSIDE");

    const employeeTitles = await titleModel.find({
      employee_id: materializedObject.employee_id,
    });

    console.log(employeeTitles);

    employeeTitles.forEach((title) => {
      if (title.title == materializedObject.title) {
        throw new EmployeeRepeatsTitleError(typeName);
      }
    });
  },
};

class EmployeeRepeatsTitleError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "Employee already has that title",
      "EmployeeRepeatsTitleError"
    );
  }
}

module.exports = {
  EmployeeRepeatsTitle,
};
