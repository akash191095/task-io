import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { StoreContext } from "../contexts/Store";
import Task from "./Task";

function TaskQueue() {
  const {
    data: { taskQueue },
  } = useContext(StoreContext);
  const ITEMS_PER_PAGE = 20;
  const pageCount = Math.ceil(taskQueue.length / ITEMS_PER_PAGE);
  const [offset, setOffset] = useState(0);

  function handlePageChange(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * ITEMS_PER_PAGE);
    setOffset(offset);
  }

  function getTasks(array, offset) {
    return array.slice(offset, offset + ITEMS_PER_PAGE);
  }

  return (
    <div className="tasks-container">
      {getTasks(taskQueue, offset).length >= 1 &&
        getTasks(taskQueue, offset).map(({ id, running }) => (
          <article key={id}>
            <Task running={running} id={id} />
          </article>
        ))}
      <div className="pagination">
        <ReactPaginate
          previousLabel="previous"
          nextLabel="next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default TaskQueue;
