import { Component, createRef } from "react";
import { graphql } from "@apollo/client/react/hoc";

import styles from "./CurrencySwitcher.module.css";
import { LOAD_CURRENCIES } from "../../GraphQl";

const options = [
  {
    label: "$ USD",
    value: "USD",
  },
  {
    label: "£ GBP",
    value: "GBP",
  },
  {
    label: "$ AUD",
    value: "AUD",
  },
  {
    label: "¥ JPY",
    value: "JPY",
  },
  {
    label: "₽ RUB",
    value: "RUB",
  },
];

class CurrencySwitcher extends Component {
  container = createRef();

  state = {
    open: false,
    label: "$",
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  handleListItemClick = (event) => {
    this.props.update(event.target.id);
    const [currency] = event.target.innerText;
    this.setState({
      label: currency,
      open: false,
    });
  };

  render() {
    const buttonStyle = this.state.open
      ? `${styles.button} ${styles["button--open"]}`
      : `${styles.button} ${styles["button--closed"]}`;

    return (
      <div className={styles.container} ref={this.container}>
        <button
          type="button"
          className={buttonStyle}
          onClick={this.handleButtonClick}
        >
          {this.state.label}
        </button>

        {this.state.open && (
          <div className={styles.dropdown}>
            <ul>
              {options.map((item, index) => (
                <li
                  key={item.value}
                  data={item.value}
                  title={item.label}
                  id={index}
                  onClick={this.handleListItemClick}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default graphql(LOAD_CURRENCIES)(CurrencySwitcher);
