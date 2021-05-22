import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as api from '../services/api';

const CartContext = createContext({});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([], () => {

    const storagedCart = localStorage.getItem('@OnlineStore:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }
    return [];
  });

  const prevCartRef = useRef([]);
  useEffect(() => {
    prevCartRef.current = cart;
  })
  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem('@OnlineStore:cart', JSON.stringify(cart))
    }
  }, [cart, cartPreviousValue])

  const addProduct = async (productId) => {
    try {
      const updatedCart = [...cart]; // para não alterar o array original
      const verifyIfProductExists = updatedCart.find((product) => product.id === productId);
      const item = await api.getProductById(productId);
      const stock = await item.available_quantity;

      const currentAmount = verifyIfProductExists ? verifyIfProductExists.amount : 0;

      const amount = currentAmount + 1;

      if (amount > stock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (verifyIfProductExists) {
        verifyIfProductExists.amount = amount;
      } else {
        const product = await api.getProductById(productId);
        const newProduct = {
          ...product,
          amount: 1,
        }
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId) => {
    try {
      const updatedCart = [...cart];
      const removeItem = updatedCart.filter(item => item.id !== productId);
      setCart(removeItem);
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount
  }) => {
    try {
      if (amount <= 0) {
        return;
      }
      const item = await api.getProductById(productId);
      const stock = await item.available_quantity;

      if (amount > stock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      if (productExists) {
        productExists.amount = amount;
        setCart(updatedCart);
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider 
      value={{ cart, addProduct, removeProduct, updateProductAmount } }
    >
      { children }
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}