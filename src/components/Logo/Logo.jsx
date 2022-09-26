import { Component } from "react";

import styles from "./Logo.module.css";

import { ReactComponent as LogoImage } from "../../images/logo.svg";
import { Link } from "react-router-dom";

class Logo extends Component {
  render() {
    return (
      <Link to="/" className={styles.logo}>
        <LogoImage title="Logo" alt="Logo"></LogoImage>
      </Link>
    );
  }
}

export default Logo;
