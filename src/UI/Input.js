import React from 'react'

import './Input.css'

const Input = ({onChange, children, placeholder}) => {
  return (
    <input
    className="glow-on-active"
    onChange={onChange}
    placeholder={placeholder}
    />
  )
}

export default Input
