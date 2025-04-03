
import React from 'react'

export const Tab = ( { name, className, active, onTabClick } ) => {
  return (
    <button className={ `${ className } ${ active ? "border-b-2 border-b-[#0F75BC]" : "" }` } onClick={ () => onTabClick( name ) }>
      { name }
    </button>
  )
}