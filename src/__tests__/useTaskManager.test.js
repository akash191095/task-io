import { renderHook, act } from "@testing-library/react-hooks/";

import useTaskManager from "../hooks/useTaskManager";
import { wait } from "@testing-library/react";

test("starts up with 1 server and 0 tasks running", () => {
  const { result } = renderHook(() => useTaskManager());

  const {
    data: { servers, taskQueue },
  } = result.current;
  expect(servers.length).toBe(1);
  expect(taskQueue.length).toBe(0);
});

test("System has a minimum of 1 server and maximum of 10 servers", () => {
  const { result } = renderHook(() => useTaskManager());

  expect(result.current.data.servers.length).toBe(1);

  // add more than 10 servers
  for (let i = 0; i < 15; i++) {
    act(() => {
      result.current.addAServer();
    });
  }

  expect(result.current.data.servers.length).toBe(10);
});

test("1 server performs only 1 task at a time", () => {
  const { result } = renderHook(() => useTaskManager());

  // starts up with 1 server
  expect(result.current.data.servers.length).toBe(1);
  // server is idle
  expect(result.current.data.servers[0].idle).toBe(true);
  // has no tasks
  expect(result.current.data.taskQueue.length).toBe(0);

  // add a task
  act(() => {
    result.current.addTask(1);
  });
  expect(result.current.data.taskQueue.length).toBe(1);

  // server is now running the task
  expect(result.current.data.servers[0].idle).toBe(false);

  // add new task
  act(() => {
    result.current.addTask(1);
  });

  // has 2 tasks
  expect(result.current.data.taskQueue.length).toBe(2);

  // 1 task is running and 1 tasks is idle
  expect(result.current.data.taskQueue[0].running).toBe(true);
  expect(result.current.data.taskQueue[1].running).toBe(false);
});

test('Server removed immediatly if idle onClick "Remove a server" button', () => {
  const { result } = renderHook(() => useTaskManager());

  const numberOfServers = result.current.data.servers.length;
  // add a server
  act(() => {
    result.current.addAServer();
  });
  expect(result.current.data.servers.length).toBe(numberOfServers + 1);

  // remove a server
  act(() => {
    result.current.markAServerToBeRemoved();
  });

  expect(result.current.data.servers.length).toBe(numberOfServers);
});

test('Server removed when job is finished if not idle onClick "Remove a server" button', async () => {
  const { result } = renderHook(() => useTaskManager());
  jest.useFakeTimers();

  const numberOfServers = result.current.data.servers.length;
  const numberOfTasks = result.current.data.taskQueue.length;

  // add a server
  act(() => {
    result.current.addAServer();
  });
  expect(result.current.data.servers.length).toBe(numberOfServers + 1);

  // add few tasks
  const tasksToAdd = 5;
  for (let i = 0; i < tasksToAdd; i++) {
    act(() => {
      result.current.addTask();
    });
  }
  expect(result.current.data.taskQueue.length).toBe(numberOfTasks + tasksToAdd);

  // remove a server
  act(() => {
    result.current.markAServerToBeRemoved();
  });

  // server is not removed immediatly
  expect(result.current.data.servers.length).toBe(numberOfServers + 1);

  // wait for tasks to finish running
  act(() => {
    jest.runAllTimers();
  });
  expect(result.current.data.servers.length).toBe(numberOfServers);
});
