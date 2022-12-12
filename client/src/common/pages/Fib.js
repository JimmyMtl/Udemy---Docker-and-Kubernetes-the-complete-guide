import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: "",
  });
  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setState((precState) => ({ ...precState, values: values.data }));
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setState((precState) => ({
      ...precState,
      seenIndexes: seenIndexes.data,
    }));
  };
  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const handleSubmit = async (event) => {
    // event.preventDefault();

    await axios.post("/api/values", {
      index: state.index,
    });
    setState((precState) => ({ ...precState, index: "" }));
  };

  const renderSeenIndexes = () => {
    return state.seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Enter your index:</label>
          <input
            type="text"
            value={state.index}
            onChange={(event) =>
              setState((precState) => ({
                ...precState,
                index: event.target.value,
              }))
            }
          />
          <button type={"submit"}>Submit</button>
        </div>
        <h3>Indicies I have seen:</h3>
        {renderSeenIndexes()}
        <h3>Calculated values:</h3>
        {renderValues()}
        {/*<div>*/}
        {/*    I calculated {JSON.stringify(state.values)}*/}
        {/*</div>*/}
      </form>
    </div>
  );
};

export default Fib;
