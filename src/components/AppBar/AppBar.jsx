import { Component } from "react";
import Navigation from "../Navigation";
import Logo from "../Logo";
import CurrencySwitcher from "../CurrencySwitcher";
import CartPreview from "../CartPreview";

import styles from "./AppBar.module.css";

class AppBar extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Navigation categories={this.props.categories} />
        <Logo />
        <div className={styles.wrapper}>
          <CurrencySwitcher update={this.props.update} />
          <CartPreview currency={this.props.currency} />
        </div>
      </header>
    );
  }
}

export default AppBar;
