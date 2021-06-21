import { ChangeEventHandler } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";

import { optionStyles } from "../utils/react-select-custom-styles";
import CaretDown from "./icons/CaretDown";

const InputBox = styled.div<{ error?: boolean }>`
  display: flex;
  .react-select__control {
    border: none;
    background-color: #f4f3f8;
    box-shadow: none;

    ${({ error }) =>
      error
        ? css`
            padding: 0.75em 0;
          `
        : css`
            padding: 0.5em 0;
          `}
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
  defaultVal?: any;
  styleClasses?: string;
  value: string | number;
  name: string;
  selectName: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSelectChange: any;
  disabled?: boolean;
  error?: any;
  onBlur?: any;
  errorMessage?: string;
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
  error,
  onBlur,
  errorMessage,
  defaultVal = null,
}: InputType) => {
  return (
    <InputBox
      data-testid="select-input"
      className={`${styleClasses} relative`}
      error={error ? true : false}
    >
      <span className="absolute text-xs left-2.5 top-1.5 text-greyish-350">
        {placeholder}
      </span>
      <input
        data-testid="select-input__input"
        className={`border  w-79% focus:outline-none text-purpleish-300 font-semibold pt-4 pl-2.5 rounded   ${
          error ? "border-misc-error pb-3" : "border-greyish-150 border-r-0"
        }`}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        onBlur={onBlur}
      />
      <Select
        className="w-21% focus:outline-none -left-1"
        classNamePrefix="react-select"
        styles={optionStyles}
        options={options}
        components={{ DropdownIndicator: CaretDown }}
        onChange={onSelectChange}
        name={selectName}
        value={defaultVal}
      />
      {error && (
        <span
          data-testid="select-input__error"
          className="absolute text-10px bottom-0 text-misc-error left-2.5 truncate"
        >
          {errorMessage}
        </span>
      )}
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
  error,
  errorMessage,
  onBlur,
}: {
  label: string;
  styles?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  value: string;
  id?: string;
  error?: any;
  onBlur?: any;
  errorMessage?: string;
}) => {
  return (
    <label className="relative" htmlFor={id} data-testid="label-input">
      <small
        className="text-13px text-greyish-350"
        data-testid="label-input__text"
      >
        {label}
      </small>
      <input
        data-testid="label-input__input"
        className={`w-full rounded-sm border  focus:outline-none text-purpleish-300 font-semibold mb-2  pl-2 ${styles} ${
          error ? "pb-3 border-misc-error" : "border-greyish-150"
        }`}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        id={id}
        onBlur={onBlur}
      />
      {error && (
        <span
          data-testid="label-input__error"
          className="absolute text-10px -bottom-4 text-misc-error left-2.5 truncate"
        >
          {errorMessage}
        </span>
      )}
    </label>
  );
};
