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

test("Server only processes 1 task at a time", async () => {
  const addTaskText = /add tasks/i;
  render(
    <StoreProvider>
      <System />
    </StoreProvider>
  );
  fireEvent.click(screen.getByText(addTaskText));
  fireEvent.click(screen.getByText(addTaskText));
  fireEvent.click(screen.getByText(addTaskText));

  expect(screen.getAllByText("waiting").length).toBe(2);
});

test("Add tasks", () => {
  const addTaskText = /add tasks/i;
  const numberOfTasksToAdd = 50;
  const totalTaskText = new RegExp(`tasks: #${numberOfTasksToAdd}`, "i");

  render(
    <StoreProvider>
      <System />
    </StoreProvider>
  );

  for (let i = 0; i < numberOfTasksToAdd; i++) {
    fireEvent.click(screen.getByText(addTaskText));
  }
  expect(screen.getByText(totalTaskText)).toBeInTheDocument();
});

test("Remove tasks", () => {
  const addTaskText = /add tasks/i;
  const numberOfTasksToAdd = 50;
  const numberOfTasksToRemove = 15;
  const totalTaskText = new RegExp(
    `tasks: #${numberOfTasksToAdd - numberOfTasksToRemove}`,
    "i"
  );

  render(
    <StoreProvider>
      <System />
    </StoreProvider>
  );

  // add tasks
  for (let i = 0; i < numberOfTasksToAdd; i++) {
    fireEvent.click(screen.getByText(addTaskText));
  }

  // remove tasks
  for (let i = 0; i < numberOfTasksToRemove; i++) {
    fireEvent.click(screen.getAllByAltText("delete")[0]);
  }

  expect(screen.getByText(totalTaskText)).toBeInTheDocument();
});

test("Add Server", () => {
  const addServerButton = /add server/i;
  const initialServersRunning = 1;
  const numberOfServersToAdd = 5;
  const serversRunning = new RegExp(
    `servers running: #${numberOfServersToAdd + initialServersRunning}`,
    "i"
  );

  render(
    <StoreProvider>
      <System />
    </StoreProvider>
  );

  // add servers
  for (let i = 0; i < numberOfServersToAdd; i++) {
    fireEvent.click(screen.getByText(addServerButton));
  }

  expect(screen.getByText(serversRunning)).toBeInTheDocument();
});
