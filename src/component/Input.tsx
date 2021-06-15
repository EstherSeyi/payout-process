import styled from "styled-components";
import Select from "react-select";

import { optionStyles } from "../utils/react-select-custom-styles";
import CaretDown from "./icons/CaretDown";

const InputBox = styled.div`
  display: flex;
  .react-select__control {
    border: none;
    background-color: #f4f3f8;
    box-shadow: none;
    padding: 0.5em 0;
  }

  .react-select__indicator-separator {
    display: none;
  }
  .react-select__placeholder,
  .react-select__input > input {
    font-size: 12px;
    color: #2c0c6a;
    font-weight: 600;
  }
`;

type InputType = {
  placeholder?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  defaultVal: string;
  styleClasses?: string;
};

export const InputWithSelect = ({
  placeholder = "",
  options,
  defaultVal,
  styleClasses = "",
}: InputType) => {
  return (
    <InputBox className={`${styleClasses} relative`}>
      <span className="absolute text-xs left-2.5 top-1.5 text-greyish-350">
        {placeholder}
      </span>
      <input className="border border-greyish-150 border-r-0 w-79% focus:outline-none text-purpleish-300 font-semibold pt-4 pl-2.5" />
      <Select
        className="w-21% focus:outline-none"
        classNamePrefix="react-select"
        styles={optionStyles}
        options={options}
        components={{ DropdownIndicator: CaretDown }}
        defaultInputValue={defaultVal}
      />
    </InputBox>
  );
};
