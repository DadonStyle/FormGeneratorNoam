// bad practice but wanted to keep this dynamic as possible
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface InputObjInterface {
  type: React.HTMLInputTypeAttribute | "select";
  label: string;
  name?: string;
  errorMessage: string;
  value: any;
  validator: (data: any) => any;
  checked?: boolean;
  options?: string[];
}

// get today date in the correct string format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// converts mock data to initial state
export const handleDataInitialState = () => {
  let initialState = {};
  mock.forEach((item: InputObjInterface) => {
    const { label, name, value, checked } = item;
    // in radio button we dont want to override the checked radio option
    if (checked !== false)
      initialState = { ...initialState, [name || label.toLowerCase()]: value };
  });

  return initialState;
};

// convert errors to initial state
export const handleErrorsInitialState = () => {
  let initialState = {};
  mock.forEach((item: InputObjInterface) => {
    const { validator, value, label, errorMessage } = item;
    const isValid = validator(value);
    if (!isValid)
      initialState = { ...initialState, [label?.toLowerCase()]: errorMessage };
  });

  return Object.keys(initialState).length === 0 ? null : initialState;
};

export const mock = [
  {
    type: "text",
    value: "",
    errorMessage: "This field is required",
    label: "First name",
    validator: (val: string) => val.length > 0,
  },
  {
    type: "number",
    value: "35",
    errorMessage: "Value most be bigger than 0",
    label: "Age",
    validator: (val: number) => val > 0,
  },
  {
    type: "password",
    value: "",
    errorMessage: "Password should contain at least 1 special characters",
    label: "Password",
    validator: (pass: string) => {
      const isValid = /[!@#$%^&*()_+{}[\]:;<>,.?/~\\-]/.test(pass);
      return isValid;
    },
  },
  {
    type: "date",
    value: getCurrentDate(),
    errorMessage: "",
    label: "Date",
    validator: () => true,
  },
  {
    type: "radio",
    value: "male",
    errorMessage: "",
    label: "Male",
    name: "gender",
    checked: true,
    validator: () => true,
  },
  {
    type: "radio",
    value: "female",
    errorMessage: "",
    label: "Female",
    name: "gender",
    checked: false,
    validator: () => true,
  },
  {
    type: "range",
    value: 0,
    errorMessage: "",
    label: "Range",
    validator: () => true,
  },
  {
    type: "color",
    value: "red",
    errorMessage: "",
    label: "Color",
    validator: () => true,
  },
  {
    type: "select",
    value: "op.1",
    options: ["op.1", "op.2", "op.3", "op.4"],
    errorMessage: "",
    label: "Dropdown",
    validator: () => true,
  },
];
