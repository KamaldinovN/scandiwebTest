import { Component } from "react";
import React from "react";
import "./TouchId.css";
import styles from "../Ports/Ports.css";
import { setActive } from "../../../redux/cart/cart_reducer";
import { connect } from "react-redux";

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
    this.props.setActive([this.props.uniqueID, this.props.arr.id, e.target.id]);
    sessionStorage.setItem(
      "activeAttribute",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("activeAttribute")),
        touchId: this.state.isTouch.findIndex(
          (item) => item.id === e.target.id
        ),
      })
    );
  };
  render() {
    return (
      <>
        <div className={styles.adds}>
          <div className={"adds__title"}>TOUCH ID IN KEYBOARD:</div>
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
const mapDispatchToProps = (dispatch) => ({
  setActive: (idProduct) => dispatch(setActive(idProduct)),
});

export default connect(null, mapDispatchToProps)(TouchId);
