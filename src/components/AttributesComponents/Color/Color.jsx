import React, { Component } from "react";
import styles from "./Color.css";
import { setActive } from "../../../redux/cart/cart_reducer";
import { connect } from "react-redux";

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
    this.props.setActive([this.props.uniqueID, this.props.arr.id, e.target.id]);
  };
  render() {
    return (
      <>
        <div className={styles.color}>
          <div className={"color__title"}>COLOR:</div>
          <div className={styles.color__container}>
            {this.state.colors.map((item) => {
              return (
                <button
                  type="button"
                  className={`radioColor ${item.isActive ? `activeColor` : ""}`}
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
const mapDispatchToProps = (dispatch) => ({
  setActive: (idProduct) => dispatch(setActive(idProduct)),
});

export default connect(null, mapDispatchToProps)(Color);
