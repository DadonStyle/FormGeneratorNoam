import { ComponentControllerProps } from "../ComponentController";
import "../../FormGeneratorComponent.css";

interface InputComponentProps extends ComponentControllerProps {}

const InputComponent = (props: InputComponentProps) => {
  const { isSubmitted, value, currentObj, error, name, ...rest } = props;

  return (
    <div className="input-wrapper">
      <label className="input-label">{currentObj.label}</label>
      <input
        className="input-field"
        type={currentObj.type}
        name={name}
        defaultValue={currentObj.value}
        {...rest}
      />
      {currentObj.type === "range" && (value || 0)}
      {isSubmitted && error}
    </div>
  );
};

export default InputComponent;
