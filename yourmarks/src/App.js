import './App.css';
import Dashbord from './Pages/Dashbord';
import SeConnecter from './Pages/SeConnecter';
import Sinscrire from './Pages/Sinscrire';
import { BrowserRouter , Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SeConnecter />} />
          <Route path='/inscrire' element={<Sinscrire />} />
          <Route path='/Dashbord' element={<Dashbord />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
