import { Component } from "react";
import React from "react";
import "./TouchId.css";
import styles from "../Ports/Ports.css";

class TouchId extends Component {
  state = {
    isTouch: this.props.arr.items,
  };

  addClass = (e) => {
    this.setState({
      isTouch: this.state.isTouch.map((item) => ({
        ...item,
        isActive: e.target.id === item.id,
      })),
    });
  };
  render() {
    return (
      <>
        <div className={styles.adds}>
          <div className={styles.adds__title}>TOUCH ID IN KEYBOARD:</div>
          <div className={styles.adds__container}>
            {this.state.isTouch.map((item) => {
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

export default TouchId;
