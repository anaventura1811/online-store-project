import * as api from './services/api';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from './styles/global';
import { useEffect } from 'react';
import { CartProvider } from './hook/useCart';
import Home from './pages/Home/Home';
import ShoppingCart from './pages/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {

  useEffect(() => {
    api.getProductById('MLB1442042006')
  }, [])

  return (
    <BrowserRouter>
      <CartProvider>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/shopping-cart" component={ ShoppingCart } />
            <Route path="/product:id" component={ ProductDetails }/>
          </Switch>
          <ToastContainer autoClose={4000} />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
