import { render, cleanup } from "@testing-library/react";

import Button from "../component/Button";

beforeEach(cleanup); //Clean up DOM

describe("<Button/>", () => {
  test("that button displays and has base styles", () => {
    const { queryByTestId } = render(<Button label="Continue" />);
    expect(queryByTestId("button")).toBeTruthy();
    expect(queryByTestId("button")).toHaveClass(
      "px-.5 py-2  w-full rounded text-xs sm:text-sm font-bold focus:outline-none"
    );
  });

  test("that if button is disabled, button will have class 'cursor-not-allowed' and incorporate classes in the 'styleClasses' prop", () => {
    const { queryByTestId } = render(
      <Button label="Continue" disabled={true} styleClasses="extra" />
    );

    expect(queryByTestId("button")).toHaveClass("cursor-not-allowed");
    expect(queryByTestId("button")).toHaveClass("extra");
  });
});
