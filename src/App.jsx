import { useState } from 'react'
import './App.css'
import Swal from 'sweetalert2'

function App() {
  const [values, setValues] = useState(['', '', '', '', ''])
  const [results, setResults] = useState({
    subtotal : '',
    discountLabel : '',
    discount : '',
    total : '',
  })

  const handleInputChange = (index, e) => {
  const newValues = [...values]
  newValues[index] = e.target.value
  setValues(newValues)
}

  const getDiscountPercent = (subtotal) => {
    if (subtotal >= 13000) return 40
    if (subtotal >= 9000) return 30
    if (subtotal >= 5000) return 20
    if (subtotal >= 1000) return 10
    return 0
  }

  const handleCalcular = () => {
     for (let i = 0; i < values.length; i++) {
      if (values[i].trim() === '') {
        Swal.fire({
          title: 'Error',
          text: `El campo Producto ${i + 1} está vacío.`,
          icon: 'error'
        })
        return
      }
      if (isNaN(values[i]) || Number(values[i]) < 0) {
        Swal.fire({
          title: 'Error',
          text: `El campo Producto ${i + 1} debe ser un número válido.`,
          icon: 'error'
        })
        return
      }
    }
 
    const nums = values.map(Number)
    const subtotal = nums.reduce((a,b) => a + b, 0) 
    const discountPercent = getDiscountPercent(subtotal)
    const discount = (subtotal * discountPercent) / 100
    const total = subtotal - discount     
    
    setResults({
      subtotal: subtotal.toFixed(2),
      discountLabel: `Descuento ${discountPercent}%`,
      discount: discount.toFixed(2),
      total: total.toFixed(2),  
    })
  }

  const handleLimpiar = () => {
    setValues(['', '', '', '', ''])
    setResults({
      subtotal: '',
      discountLabel: '',
      discount: '',
      total: '',
    })
  }

  return (
    <div className='container mt-5'>
      <h1>Calculadora de descuentos</h1>
      <form>
        <div className='row mb-3'>
          {values.map((val, index) => (
            <div className='col-md-2' key={index}>
              <label className='form-label'>Producto {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={val}
                placeholder='valor'
                onChange={e => handleInputChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div className='mb-3'>
          <button type='button' className='btn btn-success me-2' onClick={handleCalcular}>
            Calcular
          </button>
          <button type='button' className='btn btn-danger' onClick={handleLimpiar}>
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
      </form>
    </div>
  )
}

export default App
