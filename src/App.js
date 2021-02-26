import React from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

class App extends React.Component {
  state = {
    products: data.products,
    size: '',
    sort: '',
  };

  sortProducts = (e) => {
    const value = e.target.value;
    this.setState({
      sort: value,
      products: [...data.products].sort((a, b) =>
        value === 'lowest'
          ? parseFloat(a.price) - parseFloat(b.price)
          : value === 'highest'
          ? parseFloat(b.price) - parseFloat(a.price)
          : parseFloat(a._id) - parseFloat(b._id)
      ),
    });
  };

  filterProducts = (e) => {
    if (e.target.value === '') {
      this.setState({ size: e.target.value, products: data.products });
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />

              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart</div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
    );
  }
}

export default App;
