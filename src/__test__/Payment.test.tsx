import { render, cleanup } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

import Payment from "../pages/payment";
import queryClient from "../utils/query-client";

beforeEach(cleanup);

describe("<Payment/>", () => {
  test("renders the payment component and have right styles", () => {
    const { queryByTestId, debug } = render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <Payment />
        </Router>
      </QueryClientProvider>
    );

    expect(queryByTestId("payment")).toBeTruthy();
    expect(queryByTestId("payment")).toHaveClass(
      "mt-16 sm:border border-greyish-550 max-w-lg mx-auto bg-misc-white p-6 mb-4"
    );
  });
});
