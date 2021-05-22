import React, { useState, useEffect } from 'react';
import { ProductListContainer } from './styles';
import { useCart } from '../../hook/useCart';
import { Link } from 'react-router-dom';
// import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import * as api from '../../services/api';

function Home() {

    const [products, setProducts] = useState([]);
    const { addProduct, cart } = useCart();

    useEffect(() => {
      async function loadProducts() {
        const request = await api.getProductsFromCategoryAndQuery('', 'celular');
        const data = request.results.map((product) => ({
          ...product,
          priceFormatted: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(product.price),
        }));


        setProducts(data);
      }
      loadProducts();
    }, []);
    

    const cartItemsAmount = cart.reduce((sumAmount, product) => {
      const newSumAmount = {...sumAmount};
      newSumAmount[product.id] = product.amount;
  
      return newSumAmount;
      
    }, {} );
  
    const handleAddProduct = (id) => {
      addProduct(id);
    }

    return (
      <div>
        < Header />
        <ProductListContainer>
          {products.map((product) => (
            <li key={ product.id }>
               <strong>{ product.title }</strong>
               <img src={ product.thumbnail } alt={ product.title } />
               <span>{ product.priceFormatted }</span>
               <button
                  type="button"
                  data-testid="add-product-button"
                  onClick={ () => handleAddProduct(product.id)}
               >
                 <div>{cartItemsAmount[product.id] || 0}</div>
                 <span> Adicionar ao carrinho</span>
                
               </button>
               <Link to={ { pathname: `/product${product.id}`, state: {product}}}>
                 Ver detalhes
               </Link>
           </li>
          )) }
        </ProductListContainer> 
      </div>
    )
}

export default Home;
