import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import { cityApi } from "../src/api/cityApi";
import { countryApi } from "../src/api/countryApi";
import { MaskedInput } from "./utils/mask";
import { validate } from "./utils/validate";

import "./App.css";

function App() {
  const initialValues = {
    username: "",
    email: "",
    phoneNumber: "",
    cpf: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Formulário Enviado</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Dados Pessoais</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Nome</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Telefone</label>
            <MaskedInput
              name="phoneNumber"
              mask="(99)99999-9999"
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phoneNumber}</p>
          <div className="field">
            <label>CPF</label>
            <MaskedInput
              name="cpf"
              mask="999.999.999-99"
              value={formValues.cpf}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.cpf}</p>
          <h1>Destinos de Interesse</h1>
          <div className="ui divider"></div>
          <div className="field">
            <label>País</label>
            <AsyncSelect
              isMulti
              closeMenuOnSelect={false}
              cacheOptions
              loadOptions={countryApi}
              defaultOptions
              className="mt-8"
            />
          </div>
          <div className="field">
            <AsyncSelect
              isMulti
              closeMenuOnSelect={false}
              cacheOptions
              loadOptions={cityApi}
              defaultOptions
              className="mt-8"
            />
          </div>
          <button className="fluid ui button blue">Enviar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
