import { ChangeEventHandler } from "react";
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
  .react-select__single-value:before,
  .react-select__placeholder:before,
  .react-select__option:before {
    @media (max-width: 479px) {
      content: none;
    }
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
  value: string;
  name: string;
  selectName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSelectChange: any;
  disabled?: boolean;
};

export const InputWithSelect = ({
  placeholder = "",
  options,
  styleClasses = "",
  value,
  onChange,
  name,
  onSelectChange,
  selectName,
  disabled,
}: InputType) => {
  return (
    <InputBox className={`${styleClasses} relative`}>
      <span className="absolute text-xs left-2.5 top-1.5 text-greyish-350">
        {placeholder}
      </span>
      <input
        className="border border-greyish-150 border-r-0 w-79% focus:outline-none text-purpleish-300 font-semibold pt-4 pl-2.5 rounded"
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      />
      <Select
        className="w-21% focus:outline-none"
        classNamePrefix="react-select"
        styles={optionStyles}
        options={options}
        components={{ DropdownIndicator: CaretDown }}
        onChange={onSelectChange}
        name={selectName}
      />
    </InputBox>
  );
};

export const InputWithLabel = ({
  label,
  styles = "",
  placeholder = "",
  onChange,
  name,
  value,
  id,
}: {
  label: string;
  styles?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: string;
  id?: string;
}) => {
  return (
    <label htmlFor={id}>
      <small className="text-13px text-greyish-350">{label}</small>
      <input
        className={`w-full rounded-sm border border-greyish-150 focus:outline-none text-purpleish-300 font-semibold mb-2  pl-2 ${styles}`}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        id={id}
      />
    </label>
  );
};
