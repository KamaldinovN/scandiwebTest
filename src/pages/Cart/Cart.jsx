import { Component } from "react";
import CartProduct from "../../components/CartProduct";

import styles from "./Cart.module.css";

class Cart extends Component {
  componentDidMount() {
    document.title = "Cart | Nazar Kamaldinov test";
  }

  render() {
    return (
      <main>
        <section className={styles.section}>
          <h1 className={styles.title}>Cart</h1>
          <CartProduct currency={this.props.currency} />
        </section>
      </main>
    );
  }
}

export default Cart;
