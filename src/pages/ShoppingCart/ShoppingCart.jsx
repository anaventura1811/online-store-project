import React from 'react';
import { useCart } from '../../hook/useCart';


export default function ShoppingCart() {
  const { cart, updateProductAmount, removeProduct } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.price),
    subTotal: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(product.price * product.amount)
  }))

  const total =
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount
      }, 0)
    )


  function handleProductIncrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount + 1});
  }

  function handleProductDecrement(product) {
    updateProductAmount({ productId: product.id, amount: product.amount - 1});
  }

  function handleRemoveProduct(productId) {
    removeProduct(productId);
  }
    return (
    <>
      <table>
      <thead>
      <tr>
        <th aria-label="product image" />
        <th>PRODUTO</th>
        <th>QTD</th>
        <th>SUBTOTAL</th>
        <th aria-label="delete icon" />
      </tr>
    </thead>
    <tbody>
      {cartFormatted.map(product => (
        <tr key={product.id} data-testid="product">
        <td>
          <img src={product.thumbnail} alt={product.title}/>
        </td>
        <td>
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
        </td>
        <td>
          <div>
            <button
              type="button"
              data-testid="decrement-product"
              disabled={product.amount <= 1}
              onClick={() => handleProductDecrement(product)}
            >
              Diminuir
            </button>
            <input
              type="text"
              data-testid="product-amount"
              readOnly
              value={product.amount}
            />
            <button
              type="button"
              data-testid="increment-product"
              onClick={() => handleProductIncrement(product)}
            >
              Aumentar
            </button>
          </div>
        </td>
        <td>
          <strong>{product.subTotal}</strong>
        </td>
        <td>
          <button
            type="button"
            data-testid="remove-product"
            onClick={() => handleRemoveProduct(product.id)}
          >
            Deletar
          </button>
        </td>
      </tr>
    ))} 
    </tbody>
    </table>
    <footer>
      <span>TOTAL</span>
      <strong>{total}</strong>
    </footer>
  </>
  )
}
