const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

/**
 * 3 - In all the collections from_date must be smaller than to_date
 * affects
 *  deptEmployeeType
 *  deptManagerType
 *  salarayType
 *  titleType
 */
const CheckCoherentDates = {
  validate: async function (typeName, originalObject, materializedObject) {
    if (materializedObject.from_date >= materializedObject.to_date) {
      throw new CheckCoherentDatesError(typeName);
    }
  },
};

class CheckCoherentDatesError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date must be smaller than to_date",
      "CheckCoherentDatesError"
    );
  }
}

// Export module
module.exports = {
  CheckCoherentDates,
};
