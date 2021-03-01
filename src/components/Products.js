import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
export default class Products extends Component {
  state = {
    product: null,
  };

  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };

  addToCart = (product) => {
    this.props.addToCart(product);
    this.closeModal();
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascasde={true}>
          <ul className="products">
            {this.props.products.map((product) => {
              return (
                <li key={product._id} className="product">
                  <a
                    href={`#${product._id}`}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>${product.price}</div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title} />
                <div className="product-details-desc">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes:{' '}
                    {product.availableSizes.map((size, index) => {
                      return (
                        <span key={index}>
                          {' '}
                          <button className="button">{size}</button>
                        </span>
                      );
                    })}
                  </p>
                  <div className="product-price">
                    <div> ${product.price}</div>
                    <button
                      className="button primary"
                      onClick={() => this.addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
