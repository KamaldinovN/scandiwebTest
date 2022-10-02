import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import parse from "html-react-parser";

import styles from "./SingleProduct.module.css";
import { addProduct } from "../../redux/cart/cart_reducer";
import Attributes from "../AttributesComponents/Main";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover: "",
      attributes: this.props.product.attributes,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {}

  componentDidMount() {
    this.setState({ cover: this.props.product.gallery[0] });
  }

  addToCart = (product) => {
    this.props.dispatchToCart(product);
  };

  handleCover = (event) => {
    this.setState({ cover: event.target.src });
  };

  render() {
    const product = this.props.product;
    return (
      <article className={styles.product}>
        <div className={styles.gallery}>
          <div className={styles.gallery__thumbs}>
            {product.gallery.map((image) => {
              return (
                <img
                  src={image}
                  key={image}
                  className={styles.gallery__thumb}
                  alt={product.name}
                  title={product.name}
                  width="79"
                  height="80"
                  loading="lazy"
                  onClick={this.handleCover}
                />
              );
            })}
          </div>

          <div className={styles.cover}>
            <img
              src={this.state.cover}
              className={styles.cover__image}
              alt={product.name}
              title={product.name}
              width="610"
              height="511"
              loading="lazy"
            />
          </div>
        </div>

        <aside className={styles.sidebar}>
          <h1 className={styles.title}>{product.name}</h1>
          <h2 className={styles.brand}>{product.brand}</h2>

          {this.state.attributes.length ? (
            <Attributes attributes={this.state.attributes} />
          ) : null}

          <p className={styles.subtitle}>
            {product.inStock ? "price" : "last price"}:
          </p>

          <p className={styles.price}>
            {product.prices[this.props.currency].currency.symbol}
            {product.prices[this.props.currency].amount}
          </p>

          <button
            type="button"
            className={styles.add}
            onClick={() => this.addToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? "add to cart" : "Out of stock"}
          </button>

          <div className={styles.description}>{parse(product.description)}</div>
        </aside>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchToCart: (product) => dispatch(addProduct(product)),
});

export default connect(null, mapDispatchToProps)(withRouter(SingleProduct));
