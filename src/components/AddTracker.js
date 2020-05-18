import React, { useState } from "react";
import TrackerDataService from "../services/TrackerService";
import Datetime from "react-datetime";
import "../App.css";
import DisplayComponent from "./DisplayTrackerComponent";
import TrackerButtonComponent from "./TrackerButtonComponent";

const AddTracker = () => {
  const initialTrackerState = {
    id: null,
    title: "",
    description: "",
  };

  const [tracker, setTracker] = useState(initialTrackerState);
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [dateandtime, setDateAndTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  //setInterval function that runs the run function 10 miliseconds
  //change the setStatus to 1 so the valid button is displayed
  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  //change the status when user wants to enter manual time input mode
  const changeStatus = () => {
    clearInterval(interv);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setStatus(3);
    setIsVisible(true);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const resume = () => start();

  //handles title and description input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTracker({ ...tracker, [name]: value });
  };

  //handle user input time in hh:mm:ss
  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTime({ ...time, [name]: value });
  };
  //save user input to the database
  const saveTracker = () => {
    var data = {
      title: tracker.title,
      description: tracker.description,
      updatedS: time.s,
      updatedM: time.m,
      updatedH: time.h,
      dateAndTime: dateandtime,
    };

    TrackerDataService.create(data)
      .then((response) => {
        setTracker({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          updatedS: response.data.updatedS,
          updatedM: response.data.updatedM,
          updatedH: response.data.updatedM,
        });
        setSubmitted(true);
        setTime({ ms: 0, s: 0, m: 0, h: 0 });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //empty variables once the user wants to add new booking
  const newTracker = () => {
    setTracker(initialTrackerState);
    setSubmitted(false);
  };
  const startTimer = () => {
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setStatus(0);
  };
  // check the length of the user hours input field
  const maxHoursLengthCheck = (hours) => {
    if (hours.target.value.length > hours.target.maxLength) {
      hours.target.value = hours.target.value.slice(0, hours.target.maxLength);
    }
    if (hours.target.value >= 24) {
      hours.target.value = 23;
    }
    if (hours.target.value <= 0) {
      hours.target.value = 0;
    }
  };
  // check the length of the user mins and secounds input field

  const maxMinsAndSecsLengthCheck = (MinsAndSecs) => {
    if (MinsAndSecs.target.value.length > MinsAndSecs.target.maxLength) {
      MinsAndSecs.target.value = MinsAndSecs.target.value.slice(
        0,
        MinsAndSecs.target.maxLength
      );
    }
    if (MinsAndSecs.target.value >= 60) {
      MinsAndSecs.target.value = 59;
    }
    if (MinsAndSecs.target.value <= 0) {
      MinsAndSecs.target.value = 0;
    }
  };
  //call setDateAndTime function to add the data into the variable
  const onChange = (date) => {
    setDateAndTime(date);
  };

  return (
    <div className="submit-form">
      {/* show successfull when the form is submit into the database */}
      {submitted ? (
        <div>
          <h4>You booked successfully!</h4>
          <button className="btn btn-success" onClick={newTracker}>
            Add
          </button>
        </div>
      ) : (
        <div className="form-bg">
          <div className="form-group">
            <label htmlFor="title">Task</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tracker.title}
              onChange={handleInputChange}
              name="title"
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tracker.description}
              onChange={handleInputChange}
              name="description"
            />
            {/* show hours, minites and secounds when user wants to book time without the Tracker */}
            {status === 3 ? (
              <div>
                <label htmlFor="description">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  maxLength="2"
                  onInput={maxMinsAndSecsLengthCheck}
                  className="form-control"
                  id="s"
                  required
                  value={time.s}
                  onChange={handleTimeChange}
                  name="s"
                />
                <label htmlFor="description">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  maxLength="2"
                  onInput={maxMinsAndSecsLengthCheck}
                  className="form-control"
                  id="s"
                  required
                  value={time.m}
                  onChange={handleTimeChange}
                  name="m"
                />
                <label htmlFor="description">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  maxLength="2"
                  onInput={maxHoursLengthCheck}
                  className="form-control"
                  id="s"
                  required
                  value={time.h}
                  onChange={handleTimeChange}
                  name="h"
                />
              </div>
            ) : null}
            <div className="clock-holder">
              <div className="stopwatch">
                {/* send properties to the components */}
                <DisplayComponent time={time} />
                <TrackerButtonComponent
                  status={status}
                  resume={resume}
                  reset={reset}
                  stop={stop}
                  start={start}
                />
              </div>
            </div>
            <button onClick={changeStatus} className="btn btn-success">
              Manual Time input
            </button>
            {/* set time traker button visible when the user wants to book time directly from the tracker */}
            {isVisible ? (
              <button
                onClick={startTimer}
                className="btn btn-success move-right"
              >
                Time Tracker
              </button>
            ) : null}
          </div>
          <div>
            <label>Date and Time:</label> {/* date and time input fields */}
            <Datetime onChange={onChange} value={dateandtime} />
          </div>
          <br />
          <button onClick={saveTracker} className="btn btn-success ">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTracker;
