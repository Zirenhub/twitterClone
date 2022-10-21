const validatePassword = (password) => {
  if (password.length <= 16 && password.length >= 6) {
    return true;
  }
  return false;
};

export default validatePassword;
