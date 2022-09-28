import React, { Component } from "react";
import styles from "./Ports.css";
import "../Main/radiostyles.css";

class Ports extends Component {
  state = {
    isPorts: this.props.arr.items,
  };

  addClass = (e) => {
    this.setState({
      isPorts: this.state.isPorts.map((item) => ({
        ...item,
        isActive: e.target.id === item.id,
      })),
    });
  };
  render() {
    return (
      <>
        <div className={styles.adds}>
          <div className={styles.adds__title}>WITH USB 3 PORTS:</div>
          <div className={styles.adds__container}>
            {this.state.isPorts.map((item) => {
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

export default Ports;
