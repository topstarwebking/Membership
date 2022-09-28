export const validationError = (fields) => {
  var errors = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
        errors[key] = false;
    } else {
      errors[key] = `${key.split("_").join(" ")} required!`;
    }
  }
  return errors;
};

export const clearErrors = (obj) => {
  var updatedErrors = {};
  for (const [key ] of Object.entries(obj)) {
    updatedErrors[key] = false;
  }
  return updatedErrors;
};
export const changeErrorMessage = (obj) => {
  var updatedErrors = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length) {
          updatedErrors[key] = false;
        }
      } else {
        updatedErrors[key] = false;
      }
    }
  }
  return updatedErrors;
};
