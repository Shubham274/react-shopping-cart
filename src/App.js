import React from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

// localStorage.setItem('cartItems', 'Apogee');
// var artist = localStorage.getItem('track');
// console.log(artist);

class App extends React.Component {
  state = {
    products: data.products,
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    size: '',
    sort: '',
  };

  createOrder(order) {
    alert(`need to save order for ${order.name}`);
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems: cartItems });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeFromCart = (product_id) => {
    const removeItem = this.state.cartItems.filter(
      (item) => item._id !== product_id
    );
    this.setState({ cartItems: removeItem });
    localStorage.setItem('cartItems', JSON.stringify(removeItem));
  };

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
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
      <Provider store={store}>
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

                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>All rights reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
