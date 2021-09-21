import React from 'react'

import './Spinner.css'

import spinner from './spinner.gif'

const Spinner = () => {
  return (
    <>
    <div className='backdrop'>
    </div>
    <div >
      <img
      className='spinner'
      alt= 'loading...'
      src={spinner}/>
    </div>
    </>
  )
}

export default Spinner
