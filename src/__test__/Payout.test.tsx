import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "react-query";

import initialValues from "../constants/initialValues";
import { fetch } from "../helpers/fetch-data";
import { Toast } from "../utils/toast-utils";

import Payout from "../pages/payment/Payout";
import queryClient from "../utils/query-client";

beforeEach(cleanup);

const handleChange = jest.fn();
const handleBlur = jest.fn();

jest.mock("../helpers/fetch-data", () => ({
  fetch: jest.fn(),
}));
jest.mock("../utils/toast-utils", () => ({
  Toast: jest.fn(),
}));

describe("<Payout/>", () => {
  const { queryByTestId, queryByText, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <Payout
        formik={{
          values: initialValues,
          handleChange,
          handleBlur,
          errors: {},
        }}
      />
    </QueryClientProvider>
  );

  const payout = queryByTestId("payout");
  const payoutHeader = queryByTestId("payout-header");
  const headerText = queryByText("One-time Payout");
  const buttonBox = queryByTestId("button-box");
  const button = getByText("Continue");

  test("renders the payment component and have right styles", () => {
    expect(payout).toBeTruthy();
    expect(payout).toContainElement(payoutHeader);
    expect(payoutHeader).toContainElement(headerText);
    expect(headerText).toHaveClass(
      "text-base text-purpleish-300 font-semibold"
    );
    expect(buttonBox).toBeTruthy();
    expect(buttonBox).toHaveClass("flex justify-between mt-6");

    expect(buttonBox).toContainElement(button);
  });

  test("that when there is no input and 'Continue' button is clicked, there is a toast error", async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Payout
          formik={{
            values: initialValues,
            handleChange,
            handleBlur,
            errors: {},
          }}
        />
      </QueryClientProvider>
    );

    const button = getByText("Continue");
    fireEvent.click(button);
    expect(Toast).toHaveBeenCalledWith({
      type: "error",
      message: "Provide required inputs",
    });
  });

  test("that when all required input fields are provided, fetch is called to calculate the transfer fee", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Payout
          formik={{
            values: {
              from: "NGN",
              to: "USD",
              send: 1000,
            },
            handleChange,
            handleBlur,
            errors: {},
          }}
        />
      </QueryClientProvider>
    );

    await waitFor(
      () => expect(fetch).toHaveBeenCalledWith("USD", "NGN", 3.69),
      expect.anything()
    );
  });
});
