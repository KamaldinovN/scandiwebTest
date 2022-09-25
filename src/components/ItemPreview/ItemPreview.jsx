import styles from "./ItemPreview.module.css";
import { Component } from "react";

class ItemPreview extends Component {
  state = {
    quantity: 1,
    product: this.props.products,
  };

  increment = () => {
    this.setState((state) => {
      return {
        quantity: (state.quantity += 1),
      };
    });
  };

  decrement = () => {
    this.setState((state) => {
      if (state.quantity > 1) {
        return {
          quantity: (state.quantity -= 1),
        };
      }
    });
  };
  render() {
    return (
      <div className={styles.product__wrapper} key={this.state.product.id}>
        <div className={styles.product__content}>
          <p className={styles.product__name}>{this.state.product.name}</p>
          <p className={styles.product__price}>
            {this.state.product.prices[this.props.currency].currency.symbol}
            {this.state.product.prices[this.props.currency].amount}
          </p>
          {this.state.product.attributes
            ? this.state.product.attributes.map((attributes) => {
                return (
                  <div key={attributes.id}>
                    <p className={styles.subtitle} key={attributes.id}>
                      {attributes.name}:
                    </p>

                    <div className={styles.attributes}>
                      {attributes.items.map((item) => {
                        return (
                          <button
                            type="button"
                            className={
                              item.isActive ? " radio active" : styles.radio
                            }
                            key={item.id}
                            style={{ backgroundColor: `${item.value}` }}
                            title={item.displayValue}
                          >
                            {attributes.id === "Color" ? "" : item.displayValue}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            : null}

          <div></div>
        </div>

        <div className={styles.counters}>
          <button
            type="button"
            className={`${styles.square__button} ${styles.counters__up}`}
            onClick={this.increment}
          >
            +
          </button>
          <span className={styles.counters__count}>{this.state.quantity}</span>
          <button
            type="button"
            className={`${styles.square__button} ${styles.counters__down}`}
            onClick={this.decrement}
          >
            -
          </button>
        </div>

        <div className={styles.product__thumb}>
          <img
            src={this.state.product.gallery[0]}
            className={styles.product__image}
            alt=""
            width="105"
            height="137"
          />
        </div>
      </div>
    );
  }
}

export default ItemPreview;
