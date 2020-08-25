import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import System from "../pages/System";
import { StoreProvider } from "../contexts/Store";

test("Add a new task", async () => {
  const addTaskText = /add tasks/i;
  render(
    <StoreProvider>
      <System />
    </StoreProvider>
  );
  fireEvent.click(screen.getByText(addTaskText));

  expect(screen.getByText("00.0")).toBeInTheDocument();
});

test("System only processes 1 task at a time", async () => {
  const addTaskText = /add tasks/i;
  render(
    <StoreProvider>
      <System />
    </StoreProvider>
  );
  fireEvent.click(screen.getByText(addTaskText));
  fireEvent.click(screen.getByText(addTaskText));
  expect(screen.getByText("waiting")).toBeInTheDocument();
});
