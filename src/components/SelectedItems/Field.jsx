import React from 'react'
import { capitalize } from 'Utils/helper'

export const Field = ( { item, property } ) => {

  return (
    <>
      { item[ property ] ? (
        <div className={ `flex items-center justify-between ${ property === "name" ? "text-sm" : "" }` }>
          <div>{ capitalize( property ) }:</div>
          <div>{ item[ property ] }{ " " }{ [ "length", "width" ].includes( property ) ? 'ft' : '' }</div>
        </div> )

        : null
      }
    </>
  )
}
