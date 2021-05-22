import React, { useState } from 'react';
import * as api from '../services/api';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
// import { useCart } from '../hook/useCart';

function ProductCard({ product }) {
  // const {cart } = useCart();
  const [cart, setCart] = useState([]);

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
    
  }, {} );

  const handleAddProduct = (id) => {
    addProduct(id)
   }

  const addProduct = async (productId) => {
    try {
      const updatedCart = [...cart]; // para não alterar o array original
      const verifyIfProductExists = updatedCart.find((product) => product.id === productId);
      const item = await api.getProductById(productId);
      const stock = await item.available_quantity;

      const stockAmount = stock.data.amount;
      const currentAmount = verifyIfProductExists ? verifyIfProductExists.amount : 0;

      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (verifyIfProductExists) {
        verifyIfProductExists.amount = amount;
      } else {
        const product = await api.getProductById(productId);
        const newProduct = {
          ...product.data,
          amount: 1,
        }
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const { title, id, priceFormatted, thumbnail } = product;
  return (
    <li>
        <strong>{ title }</strong>
        <img src={ thumbnail } alt={ title } />
        <span>{ priceFormatted }</span>
        <button
        type="button"
        data-testid="add-product-button"
        onClick={ (e) => handleAddProduct(id)}
        >
          <div>{cartItemsAmount[id] || 0}</div>
          <span> Adicionar ao carrinho</span>
         
        </button>
        <Link to={ { pathname: `/product${product.id}`, state: {product}}}>Ver detalhes</Link>
    </li>
  )
}

export default ProductCard;
