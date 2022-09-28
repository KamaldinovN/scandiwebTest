import React, { Component } from "react";
import styles from "./Color.css";

class Color extends Component {
  state = {
    colors: this.props.arr.items,
  };

  addClass = (e) => {
    this.setState({
      colors: this.state.colors.map((color) => ({
        ...color,
        isActive: e.target.id === color.id,
      })),
    });
  };
  render() {
    return (
      <>
        <div className={styles.color}>
          <div className={styles.color__title}>COLOR:</div>
          <div className={styles.color__container}>
            {this.state.colors.map((item) => {
              return (
                <button
                  type="button"
                  className={`radioColor ${item.isActive ? `active` : ""}`}
                  key={item.id}
                  id={item.id}
                  onClick={this.addClass}
                  title={item.displayValue}
                  style={{ backgroundColor: `${item.value}` }}
                ></button>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Color;
