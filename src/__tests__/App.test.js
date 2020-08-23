import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders a system", () => {
  const { getByText } = render(<App />);
  const title = getByText(/System - Task Manager/i);
  expect(title).toBeInTheDocument();
});
