import styles from "./ItemCart.module.css";
import { Component } from "react";

import { ReactComponent as ArrowNext } from "../../images/arrow2.svg";
import { ReactComponent as ArrowPrev } from "../../images/arrow1.svg";

class ItemCart extends Component {
  constructor(props) {
    super(props);
    this.setNextPhoto = this.setNextPhoto.bind(this);
    this.setPrevPhoto = this.setPrevPhoto.bind(this);
    this.state = {
      quantity: 1,
      photoId: 0,
    };
  }
  handleAttributes = () => {
    //  alert('Selected');
  };
  setNextPhoto() {
    this.setState({
      photoId: this.state.photoId + 1,
    });
    if (this.state.photoId >= this.props.product.gallery.length - 1) {
      this.setState({
        photoId: 0,
      });
    }
  }
  setPrevPhoto() {
    this.setState({ photoId: this.state.photoId - 1 });
    if (this.state.photoId <= 0) {
      this.setState({
        photoId: this.props.product.gallery.length - 1,
      });
    }
  }

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
    const product = this.props.product;
    return (
      <div className={styles.item} key={product.id}>
        <div className={styles.product}>
          <p className={styles.product__name}>{product.name}</p>
          <p className={styles.product__brand}>{product.brand}</p>
          <p className={styles.product__price}>
            {product.prices[this.props.currency].currency.symbol}
            {product.prices[this.props.currency].amount}
          </p>

          {product.attributes
            ? product.attributes.map((attributes) => {
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
                            className={styles.radio}
                            key={item.id}
                            onClick={this.handleAttributes}
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
        </div>

        <div className={styles.wrapper}>
          <div className={styles.counters}>
            <button
              type="button"
              className={styles.counters__button}
              onClick={this.increment}
            >
              +
            </button>
            <span className={styles.counters__value}>
              {this.state.quantity}
            </span>
            <button
              type="button"
              className={styles.counters__button}
              onClick={this.decrement}
            >
              -
            </button>
          </div>

          <div className={styles.gallery}>
            {product.gallery.length > 1 ? (
              <>
                {" "}
                <ArrowPrev
                  className={styles.gallery__prev}
                  onClick={this.setPrevPhoto}
                ></ArrowPrev>
                <ArrowNext
                  className={styles.gallery__next}
                  onClick={this.setNextPhoto}
                />
              </>
            ) : null}
            <img
              src={product.gallery[this.state.photoId]}
              className={styles.gallery__image}
              alt={product.name}
              title={product.name}
              width="141"
              height="185"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCart;
