import React from 'react'
import { SelectedItem } from './SelectedItem'

export const SelectedItems = ( { selectedItems } ) => {

  return (
    <div className={ `gap-x-[8px] border-t-2 w-full px-3` }>
      { selectedItems?.length ? selectedItems?.map( ( item, index ) => (
        <SelectedItem key={ index } selectedItem={ item } />
      ) )

        : null }
    </div>
  )
}
