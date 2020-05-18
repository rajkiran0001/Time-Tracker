import React from "react";

function BtnComponent(props) {
  return (
    <div>
      {/* show start button when the status is equal to 0 */}
      {props.status === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-gre"
          onClick={props.start}
        >
          Start
        </button>
      ) : (
        ""
      )}
      {/* show reset and stop button when the status is equal to 1 */}
      {props.status === 1 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.stop}
          >
            Stop
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
      {/* show reset and stop button when the status is equal to 2 */}
      {props.status === 2 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.resume}
          >
            Resume
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
      {/* show Manual mode when the status is equal to 3 */}
      {props.status === 3 ? (
        <div>
          <br />
          <p>Manual mode</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BtnComponent;
