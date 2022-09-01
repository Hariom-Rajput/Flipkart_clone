import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


// components
import Header from './components/header/Header';    //  importing the Header from the same folder 
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import { TemplateProvider } from './templatess/TemplateProvider';
import ContextProvider from "./context/ContextProvider";
import DetailView from './components/itemDetails/DetailView';
import { Box } from '@material-ui/core';

function App() {
  return (

    <TemplateProvider>
      <ContextProvider>
        <Router>
          <Header />
          <Box style={{ marginTop: 54 }}>
            <Routes >                 {/*for switch one page to another page, without reload the page*/}
              <Route exact path='/' element={<Home />} />
              <Route exact path='/cart' element={<Cart />} />
              <Route exact path='/product/:id' element={<DetailView />} />
            </Routes>
          </Box>
        </Router>
      </ContextProvider>
    </TemplateProvider>
  )
}

export default App;
