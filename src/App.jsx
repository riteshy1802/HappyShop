import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Homepage from './components/HomePage/Homepage'
import Cart from './components/Cart/Cart'
import { Toaster } from 'react-hot-toast'
import ProductDetails from './components/ProductDetails/ProductDetails'

function App() {

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar/>
            <Homepage/>
          </>
        }
        />
        <Route path='/cart' element={
          <>
            <Navbar/>
            <Cart/>
          </>
        }
        />
        <Route path='/product/:id/price/:price/discount/:discount' element={
          <>
            <ProductDetails/>
          </>
        }
        />
      </Routes>
    </div>
  )
}

export default App
