import React, { Component } from "react";
import styles from "./Capacity.css";
import "../Main/radiostyles.css";

class Capacity extends Component {
  state = {
    capacity: this.props.arr.items,
  };

  addClass = (e) => {
    this.setState({
      capacity: this.state.capacity.map((capacity) => ({
        ...capacity,
        isActive: e.target.id === capacity.id,
      })),
    });
  };
  render() {
    return (
      <>
        <div className={styles.capacity}>
          <div className={"capacity__title"}>CAPACITY:</div>
          <div className={styles.capacity__container}>
            {this.state.capacity.map((item) => {
              return (
                <button
                  type="button"
                  className={`radio ${item.isActive ? `active` : ""}`}
                  key={item.id}
                  id={item.id}
                  onClick={this.addClass}
                  title={item.displayValue}
                >
                  {item.displayValue}
                </button>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Capacity;
