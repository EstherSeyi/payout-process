import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";

import { InputWithLabel, InputWithSelect } from "../component/Input";

beforeEach(cleanup); //Clean up DOM

const values = {
  send: 0,
  from: "",
  fullName: "",
};
const handleChange = jest.fn();

describe("<InputWithSelect/>", () => {
  const { queryByTestId } = render(
    <InputWithSelect
      value={values.send}
      name="send"
      onChange={handleChange}
      selectName="from"
      options={[
        {
          label: "NGN",
          value: "Nigerian Naira",
        },
      ]}
      onSelectChange={(selected: { label: string; value: string }) => {
        values.from = selected.label;
      }}
    />
  );
  const inputBox = queryByTestId("select-input");
  const input = queryByTestId("select-input__input");
  const errorSpan = queryByTestId("select-input__error");

  test("that button displays and has base styles", () => {
    {
      expect(inputBox).toBeTruthy();
      expect(inputBox).toContainElement(input);

      expect(input).toHaveClass(
        "border  w-79% focus:outline-none text-purpleish-300 font-semibold pt-4 pl-2.5 rounded"
      );
    }
  });

  test("When error is not true, error is not displayed.", () => {
    expect(errorSpan).not.toBeTruthy();
  });
  test("When error is true, error is displayed and styled properly", () => {
    const { queryByTestId, getByText } = render(
      <InputWithSelect
        value={values.send}
        name="send"
        onChange={({ target }) => (values.send = Number(target.value))}
        selectName="from"
        options={[
          {
            label: "NGN",
            value: "Nigerian Naira",
          },
        ]}
        onSelectChange={(selected: { label: string; value: string }) => {
          values.from = selected.label;
        }}
        error={true}
        errorMessage="An error has occured"
      />
    );

    expect(queryByTestId("select-input__error")).toBeTruthy();
    expect(queryByTestId("select-input__error")).toHaveClass(
      "absolute text-10px bottom-0 text-misc-error left-2.5 truncate"
    );
    expect(getByText("An error has occured")).toBeTruthy();
    expect(queryByTestId("select-input__input")).toHaveClass(
      "border-misc-error pb-3"
    );
  });

  test("that handleChange handler is fired onChange of input", async () => {
    const { getByTestId } = render(
      <InputWithSelect
        value={values.send}
        name="send"
        onChange={handleChange}
        selectName="from"
        options={[
          {
            label: "NGN",
            value: "Nigerian Naira",
          },
        ]}
        onSelectChange={(selected: { label: string; value: string }) => {
          values.from = selected.label;
        }}
      />
    );

    const input = getByTestId("select-input__input");
    fireEvent.change(input, { target: { value: "1" } });

    await waitFor(
      () => expect(handleChange).toHaveBeenCalled(),
      expect.anything()
    );
  });
});

describe("<InputWithLabel/>", () => {
  const { queryByTestId, getByText } = render(
    <InputWithLabel
      label="Recipient's Fullname"
      value={values.fullName}
      onChange={handleChange}
      name="fullName"
    />
  );

  const label = queryByTestId("label-input");
  const labelText = getByText("Recipient's Fullname");
  const input = queryByTestId("label-input__input");
  const errorSpan = queryByTestId("label-input__error");

  test("that it renders the component and has base styles", () => {
    expect(label).toBeTruthy();
    expect(label).toContainElement(labelText);
    expect(labelText).toBeTruthy();
    expect(input).toBeTruthy();
    expect(input).toHaveClass(
      "w-full rounded-sm border  focus:outline-none text-purpleish-300 font-semibold mb-2  pl-2 "
    );
  });
  test("When error is not true, error is not displayed.", () => {
    expect(errorSpan).not.toBeTruthy();
  });

  test("When error is true, display error and style affected elements properly", () => {
    const { queryByTestId } = render(
      <InputWithLabel
        label="Recipient's Fullname"
        value={values.fullName}
        onChange={handleChange}
        name="fullName"
        error={true}
        errorMessage="An Error has occured"
      />
    );

    expect(queryByTestId("label-input__error")).toBeVisible();
    expect(queryByTestId("label-input__error")).toHaveTextContent(
      "An Error has occured"
    );
    expect(queryByTestId("label-input__input")).toHaveClass(
      "pb-3 border-misc-error"
    );
  });

  test("that handleChange handler is fired onChange of input", async () => {
    const { getByTestId } = render(
      <InputWithLabel
        label="Recipient's Fullname"
        value={values.fullName}
        onChange={handleChange}
        name="fullName"
      />
    );

    const input = getByTestId("label-input__input");
    fireEvent.change(input, { target: { value: "e" } });

    await waitFor(
      () => expect(handleChange).toHaveBeenCalled(),
      expect.anything()
    );
  });
});
