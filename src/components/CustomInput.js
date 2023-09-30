import React from 'react'

const CustomInput = (props) => {
  const { type, name, placeholder, className } = props;
  let checkClassName = "";
  if (className) {
    checkClassName = className;
  }
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${checkClassName}`}
      />
    </div>
  )
}

export default CustomInput
