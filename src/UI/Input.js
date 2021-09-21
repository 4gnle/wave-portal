import React from 'react'

import './Input.css'

const Input = ({onChange, style, children, placeholder}) => {
  return (
    <input
    style={style}
    className="glow"
    onChange={onChange}
    placeholder={placeholder}
    />
  )
}

export default Input
