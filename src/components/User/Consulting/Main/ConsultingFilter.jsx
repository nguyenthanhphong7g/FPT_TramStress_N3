import React from 'react'
import './ConsultingFilter.css'
import Gender from '../Combobox/Gender'
import Stars from '../Combobox/Stars'

const ConsultingFilter = () => {
  return (
    <div className='consulting-filter'>
      <h4>Bộ lọc</h4>
      <Gender />
      <Stars />
    </div>
  )
}

export default ConsultingFilter
