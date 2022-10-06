import React, { Component } from "react";
import styles from "./Ports.css";
import "../Main/radiostyles.css";
import { setActive } from "../../../redux/cart/cart_reducer";
import { connect } from "react-redux";

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
    this.props.setActive([this.props.uniqueID, this.props.arr.id, e.target.id]);
    sessionStorage.setItem(
      "activeAttribute",
      JSON.stringify({
        ...JSON.parse(sessionStorage.getItem("activeAttribute")),
        ports: this.state.isPorts.findIndex((item) => item.id === e.target.id),
      })
    );
  };
  render() {
    return (
      <>
        <div className={styles.adds}>
          <div className={"adds__title"}>WITH USB 3 PORTS:</div>
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
const mapDispatchToProps = (dispatch) => ({
  setActive: (idProduct) => dispatch(setActive(idProduct)),
});

export default connect(null, mapDispatchToProps)(Ports);
