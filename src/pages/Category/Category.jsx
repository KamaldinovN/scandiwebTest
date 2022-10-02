import { Component } from "react";

import ProductsList from "../../components/ProductsList";
import Loader from "../../components/Loader";

import styles from "./Category.module.css";
import Pagination from "../../components/Pagination/Pagination";
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { LOAD_CATEGORY } from "../../GraphQl";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemPerPage: 10,
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
    const { data } = this.props;
    const { loading, error } = data;
    let products = [];
    if (loading) {
      return <Loader />;
    } else {
      products = data.category.products;
    }
    const categoryName = this.props.name;
    const lastPostIndex = this.state.currentPage * this.state.itemPerPage;
    const firstPostIndex = lastPostIndex - this.state.itemPerPage;
    const currentItem = products.slice(firstPostIndex, lastPostIndex);
    console.log(products);
    return (
      <main>
        <section className={styles.category}>
          <h1 className={styles.title}>{categoryName}</h1>
          {products && (
            <ProductsList
              products={currentItem}
              category={categoryName}
              currency={this.props.currency}
            />
          )}
        </section>
        {products.length >= 10 ? (
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

export default withRouter(
  graphql(LOAD_CATEGORY, {
    options: (props) => ({
      variables: {
        category: props.name,
      },
    }),
  })(Category)
);
