import React from 'react';
import Fade from 'react-reveal/Fade';

const Cart = (props) => {
  // state = {
  //   showCheckOut: false,
  // };

  const [showCheckOut, setShowCheckOut] = React.useState(false);
  const [state, setState] = React.useState({
    name: '',
    email: '',
    address: '',
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: state.name,
      email: state.email,
      address: state.address,
      cartItems: props.cartItems,
    };
    props.createOrder(order);
  };
  const { cartItems } = props;
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
          <Fade left cascade>
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
                          onClick={() => props.removeFromCart(cart)}
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
          </Fade>
        </div>
      </div>
      {cartItems.length !== 0 && (
        <div>
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
              <button
                onClick={() => {
                  setShowCheckOut(true);
                }}
                className="button primary"
              >
                Proceed
              </button>
            </div>
          </div>
          {showCheckOut && (
            <Fade right cascade>
              <div className="cart">
                <form onSubmit={createOrder}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleInput}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="name">Name</label>
                      <input
                        type="name"
                        name="name"
                        onChange={handleInput}
                        required
                      />
                    </li>
                    <li>
                      <label htmlFor="Address">Address</label>
                      <input
                        type="text"
                        name="address"
                        onChange={handleInput}
                        required
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
