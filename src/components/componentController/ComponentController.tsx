import { InputObjInterface } from "../../constants/mock";
import SelectComponent from "./SelectComponent/SelectComponent";
import InputComponent from "./InputComponent/InputComponent";

export interface ComponentControllerProps {
  error: string | null;
  name: string;
  currentObj: InputObjInterface;
  value: string;
  isSubmitted: boolean;
  [key: string]: unknown; // this is for the ...rest
}

const ComponentController = (props: ComponentControllerProps) => {
  const { currentObj } = props;
  // switch for additional support if needed in the future
  switch (currentObj.type) {
    case "select":
      return <SelectComponent {...props} />;
    default:
      return <InputComponent {...props} />;
  }
};

export default ComponentController;
