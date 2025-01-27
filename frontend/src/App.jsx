import React , {useState, useEffect}from 'react'
import {createBrowserRouter,BrowserRouter,Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
function App() {
 const [cinema , setCinema]= useState([]);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(() => {
      const fetchChinema = async () => {
        try {
          const response = await fetch("api/cinema/allcinema");
          
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
           
          setCinema(data)
           console.log(data)

        } catch (err) {
          setError(err.message); 
        } finally {
          setLoading(false); 
        }
      };
  
      fetchChinema();
    }, []);
  return (
    <div>
      <BrowserRouter>
      
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<h1>About</h1>}/>
          <Route path='/contact' element={<h1>Contact</h1>}/>
          <Route path='/offer' element={<h1>offer</h1>}/>
          <Route path='/now-showing' element={<h1>now showing</h1>}/>
          <Route path='/upcoming' element={<h1>upcoming</h1>}/>




          </Routes>     
      </BrowserRouter>

    </div>
  )
}

export default App
