## Project is hosted at:

[https://task-io.netlify.app/](https://task-io.netlify.app/)

## CRUD Operations

- Add a server
- Remove a server
- Add tasks

## Tests

### System

- System starts with only 1 server
- System starts with 0 tasks
- System has a minimum of 1 server and maximum of 10 servers <strong>running simultaneously</strong>

### Server

- 1 server performs only 1 task at a time
- Server removed onClick "Remove a server" button

#### Idle:

    - Remove immediately

#### Active:

    - wait for the job to complete then remove immediately

### Tasks

- Add task on button click
- Tasks starts immediately if server available else added to task queue
- Task cannot be removed or stopped if in progress
- Task can be removed if not started yet by onClick delete button

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
