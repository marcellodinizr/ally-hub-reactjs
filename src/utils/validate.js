export const validate = (values) => {
  const errors = {};
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.username) {
    errors.username = "Nome é necessário!";
  }
  if (!values.email) {
    errors.email = "Email é necessário!";
  } else if (!regexEmail.test(values.email)) {
    errors.email = "Formato de email invalido!";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Telefone é necessário";
  }
  if (!values.cpf) {
    errors.cpf = "CPF é necessário";
  }

  return errors;
};
