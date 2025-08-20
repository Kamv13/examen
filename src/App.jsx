import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [values, setValues] = useState(['', '', '', '', ''])
  const [results, setResults] = useState({
    subtotal : '',
    discountLabel : '',
    discount : '',
    total : '',
  })

  return (
    <div className='container mt-5'>
      <h1>Calculadora de descuentos</h1>
      <form>
        <div className='row mb-3'>
          {values.map((val, index) => (
            <div className='col-md-2' key={index}>
              <label className='form-Label'>Producto {index+1}</label>
              <input 
              type="text" 
              className="form-control" 
              value={val} 
              placeholder='valor'
              />
            </div>
          ))}
          <div className='mb-3'>
            <button type='button' className='btn btn-success'>
              calcular
            </button>
            <button type='button' className='btn btn-danger'>
              Limpiar
            </button>
          </div>
          <div className='row mt-4'>
            <div className='col-md-4'>
              <label className='form-label'>Subtotal</label>
              <input 
              type="text"
              className='form-control'
              value={results.subtotal}
              readOnly 
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label'>{results.discountLabel || 'Descuento'}</label>
              <input 
              type="text"
              className='form-control'
              value={results.discount} 
              readOnly
              />
            </div>
            <div className="col-md-4">
            <label className="form-label">Total a Pagar</label>
            <input
              type="text"
              className="form-control"
              value={results.total}
              readOnly
            />
          </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default App
