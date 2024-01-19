import { ComponentControllerProps } from "../ComponentController";

interface SelectComponentProps extends ComponentControllerProps {}

const SelectComponent = (props: SelectComponentProps) => {
  const { isSubmitted, currentObj, error, ...rest } = props;
  if (!currentObj.options) return <div>Missing options</div>;
  return (
    <div className="input-wrapper">
      <label className="input-label">{currentObj.label}</label>
      <select {...rest}>
        {currentObj.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {isSubmitted && error}
    </div>
  );
};

export default SelectComponent;
