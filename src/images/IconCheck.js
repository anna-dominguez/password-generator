import React from 'react'

export default function IconCheck({ props, onClick }) {
  return (
    <svg
      onClick={onClick}
      width="14"
      height="12"
      className={props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="#18171F"
        strokeWidth="3"
        fill="none"
        d="M1 5.607 4.393 9l8-8"
      />
    </svg>
  )
}
