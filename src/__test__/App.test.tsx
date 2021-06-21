import { render } from "@testing-library/react";
import App from "../App";

describe("<App/>", () => {
  test("renders the application", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId("application")).toBeTruthy();
  });
});
