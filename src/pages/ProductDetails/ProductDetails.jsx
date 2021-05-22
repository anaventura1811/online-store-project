import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';

function ProductDetails() {

  const location = useLocation();
  const { product } = location.state;
  const { title, thumbnail, price } = product;

  return (
    <div>
      <Header />
      <section>
        <strong>{ title }</strong>
        <img src={thumbnail} alt={title} />
        <span>{ new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price) }</span>
      </section>
    </div>
  )
}

export default ProductDetails;
