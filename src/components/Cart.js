import { logDOM } from '@testing-library/react';
import React, { Component } from 'react';

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header"> cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items in the cart
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((cart) => {
                return (
                  <li key={cart._id}>
                    <div>
                      <img src={cart.image} alt={cart.title} />
                    </div>
                    <div>
                      <div>{cart.title}</div>
                      <div className="right">
                        ${cart.price} x {cart.count} {''}
                        <button
                          onClick={() => this.props.removeFromCart(cart)}
                          className="button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total: {''}$
                {cartItems
                  .reduce(
                    (acc, currValue) => acc + currValue.price * currValue.count,
                    0
                  )
                  .toFixed(2)}
              </div>
              <button className="button primary">Proceed</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
