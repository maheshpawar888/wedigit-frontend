import'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Switch, Route } from 'react-router-dom';
import './App.css';
import AddProduct from './component/addProduct';
import Assignproduct from './component/Assignproduct';
import Login from './component/login';
import Products from './component/Products';
import Register from './component/register';
import Users from './component/Users';
import ViewProdct from './component/ViewProdct';

function App() {
  return (
    <BrowserRouter>
      <div className = "container">
        <Switch>
          <Route exact path = "/"  component = { Login } />
          <Route path = "/register"  component = { Register } />
          <Route path = "/products" component = { Products } />
          <Route path = "/addproduct" component = { AddProduct } />
          <Route path = "/products" component = { Products } />
          <Route path = "/users" component = { Users } />
          <Route path = "/viewproduct/:id" component = {ViewProdct} />
          <Route path = "/assignproduct/:id" component = { Assignproduct } />
        </Switch>
      </div>
    </BrowserRouter>    
  );
}

export default App;
