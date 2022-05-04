import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Worksheet from './screens/Worksheet/Worksheet';
import Input from './screens/Input';
import ErrorPage from './screens/ErrorPage';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Worksheet />} />
        <Route path="/input-product" element={<Input />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
