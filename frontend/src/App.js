import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Worksheet from './screens/Worksheet/Worksheet';
import ErrorPage from './screens/ErrorPage';
import Input from './components/ProductManagerComponents/Input';
import ProductEdit from './components/ProductManagerComponents/ProductEdit';
import ProductManager from './screens/ProductManager';


function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Worksheet />} />
        <Route path="/input-product" element={<Input />} />
        <Route path="/edit-product" element={<ProductEdit />} />
        <Route path="/product-manager" element={<ProductManager />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
