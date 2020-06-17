const gnx = require("@simtlix/gnx");
const GNXError = gnx.GNXError;

/**
 * 3 - In all the collections from_date must be smaller than to_date
 */

const FromDateMustBeSmallerThanToDate = {
  async function(typeName, originalObject, materializedObject) {
    if (materializedObject.to_date < materializedObject.from_date) {
      throw new FromDateMustBeSmallerThanToDate(typeName);
    }
  },
};

class FromDateMustBeSmallerThanToDateError extends GNXError {
  constructor(typeName) {
    super(
      typeName,
      "from_date must be smaller than to_date",
      "FromDateMustBeSmallerThanToDateError"
    );
  }
}

module.exports = { FromDateMustBeSmallerThanToDateError };
