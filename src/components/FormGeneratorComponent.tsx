// keeping this to make it dynamic as possible (few event types can be used)
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  InputObjInterface,
  handleDataInitialState,
  handleErrorsInitialState,
  mock,
} from "../constants/mock";
import ComponentController from "./componentController/ComponentController";
import "./FormGeneratorComponent.css";

const FormGeneratorComponent = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string } | null>(
    handleErrorsInitialState()
  );
  const [data, setData] = useState<{ [key: string]: string }>(
    handleDataInitialState()
  );

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (errors) return;
    console.log(data);
  };

  const handleOnInputChange = (validation: any, errMsg: string) => (e: any) => {
    setIsSubmitted(false);
    const name = e.target.name;
    const value = e.target.value;
    const isValid = validation(value);
    if (!isValid) {
      setErrors((prev) => {
        const newState = { ...prev, [name]: errMsg };
        return newState;
      });
      return;
    }
    // delete err if exist
    if (errors && errors[name]) {
      setErrors((prev) => {
        const newState = { ...prev };
        delete newState[name];
        return Object.keys(newState).length === 0 ? null : newState;
      });
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const formGenerator = (inputsArr: InputObjInterface[]) => (
    <>
      {inputsArr.map((obj, index) => (
        <ComponentController
          key={obj?.label || index}
          currentObj={obj}
          onChange={handleOnInputChange(obj.validator, obj.errorMessage)}
          name={obj?.name || obj?.label?.toLowerCase()}
          error={errors?.[obj?.label?.toLowerCase()] || null}
          isSubmitted={isSubmitted}
          value={data[obj?.label?.toLowerCase()]}
          defaultChecked={obj?.checked}
        />
      ))}
    </>
  );

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      {formGenerator(mock)}
      <button className="submit-button">submit</button>
    </form>
  );
};

export default FormGeneratorComponent;
