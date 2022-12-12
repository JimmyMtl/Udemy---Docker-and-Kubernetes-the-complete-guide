import React, { Component } from "react";
import axios from "axios";

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };

  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  componentDidMount() {
    this.fetchValues();

    this.fetchIndexes();
  }

  handleSubmit = async (event) => {
    // event.preventDefault();

    await axios.post("/api/values", {
      index: this.state.index,
    });
    this.setState({ index: "" });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(", ");
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="">Enter your index:</label>
            <input
              type="text"
              value={this.state.index}
              onChange={(event) => this.setState({ index: event.target.value })}
            />
            <button type={"submit"}>Submit</button>
          </div>
          <h3>Indicies I have seen:</h3>
          {this.renderSeenIndexes()}
          <h3>Calculated values:</h3>
          {this.renderValues()}
          {/*<div>*/}
          {/*    I calculated {JSON.stringify(this.state.values)}*/}
          {/*</div>*/}
        </form>
      </div>
    );
  }
}

export default Fib;
