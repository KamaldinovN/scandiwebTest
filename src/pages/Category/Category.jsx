import { Component } from "react";

import ProductsList from "../../components/ProductsList";
import Loader from "../../components/Loader";

import styles from "./Category.module.css";
import Pagination from "../../components/Pagination/Pagination";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemPerPage: 3,
    };
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }
  componentDidMount() {
    document.title = "Category | Nazar Kamaldinov test";
  }
  setCurrentPage(id) {
    this.setState({ currentPage: id });
  }

  render() {
    const products = this.props.products;
    const categoryName = this.props.name;
    const loading = this.props.loading;
    const error = this.props.error;
    const lastPostIndex = this.state.currentPage * this.state.itemPerPage;
    const firstPostIndex = lastPostIndex - this.state.itemPerPage;
    const currentItem = products.slice(firstPostIndex, lastPostIndex);
    return (
      <main>
        <section className={styles.category}>
          {categoryName ? (
            <h1 className={styles.title}>{categoryName}</h1>
          ) : (
            <h1 className={styles.title}>{"all"}</h1>
          )}

          {products && (
            <ProductsList
              products={currentItem}
              category={categoryName}
              currency={this.props.currency}
            />
          )}
        </section>
        {products.length >= 3 ? (
          <Pagination
            totalPosts={products.length}
            itemPerPage={this.state.itemPerPage}
            setCurrentPage={this.setCurrentPage}
            currentPage={this.state.currentPage}
          />
        ) : null}
        {error && <p>{JSON.stringify(error.message)}</p>}

        {loading && <Loader />}
      </main>
    );
  }
}

export default Category;
