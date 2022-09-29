import React from "react";
import { Component } from "react";
import styles from "./Size.css";
import "../Main/radiostyles.css";

class Size extends Component {
  state = {
    sizes: this.props.arr.items,
  };

  addClass = (e) => {
    this.setState({
      sizes: this.state.sizes.map((size) => ({
        ...size,
        isActive: e.target.id === size.id,
      })),
    });
  };

  render() {
    return (
      <>
        <div className={styles.size}>
          <div className="size__title">SIZE:</div>
          <div className={styles.size__container}>
            {this.state.sizes.map((item) => {
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

export default Size;
