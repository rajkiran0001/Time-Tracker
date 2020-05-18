import React, { useState, useEffect } from "react";
import TrackerDataService from "../services/TrackerService";
import axios from "axios";

const TrackersList = () => {
  const [trackers, setTrackers] = useState([]);
  const [searchDesc, setsearchDesc] = useState("");
  let [page, setPage] = useState(1);

  //call retrieveTrackers function on the inital page load
  useEffect(() => {
    retrieveTrackers();
  }, []);

  const onChangesearchDesc = (e) => {
    const searchDesc = e.target.value;
    setsearchDesc(searchDesc);
  };

  const retrieveTrackers = () => {
    TrackerDataService.getAll()
      .then((response) => {
        setTrackers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // find description based on user search field
  const findByDesc = () => {
    TrackerDataService.findByDesc(searchDesc)
      .then((response) => {
        setTrackers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // pagination with limit set to 10 pages
  const fetchPage = (page) => {
    axios
      .get(`http://localhost:8080/api/trackers/?page=${page}&limit=10`)
      .then((res) => {
        setTrackers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousPage = () => {
    if (page >= 2) {
      setPage((page = page - 1));
      fetchPage(page);
    }
  };

  //On everyclick increment the page by one
  const nextPage = (e) => {
    if (page >= 0 && page <= trackers.length) {
      setPage((page = page + 1));
      fetchPage(page);
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by description"
            value={searchDesc}
            onChange={onChangesearchDesc}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDesc}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <h4>Booking List</h4>

        <ul className="list-group">
          {trackers &&
            trackers.map((tracker, index) => (
              <li className={"list-group-item "} key={index}>
                <strong>Task Name: </strong>
                {tracker.title}
                <strong> Description: </strong> {tracker.description}{" "}
                <strong>Date and Time: </strong>
                {tracker.dateAndTime} <strong>Spent Time: </strong>
                {tracker.updatedH}:{tracker.updatedM}: {tracker.updatedS}{" "}
                (hh:mm:ss)
              </li>
            ))}
        </ul>
        <br />
      </div>
      <b>Page: {page}</b>{" "}
      <div>
        <button
          className="btn btn-success"
          data-test="pagination"
          onClick={previousPage}
        >
          Previous Page
        </button>
        <button className="btn btn-success move-right" onClick={nextPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default TrackersList;
