import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hook/useCart';

function Header() {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <header>
      <Link data-testid="shopping-cart-button" to="/shopping-cart">
        <div>
          <strong>Carrinho</strong>
          <span data-testid="shopping-cart-size">
            { cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Header;
