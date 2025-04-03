import { Chevron } from 'Assets/svgs'
import React from 'react'
import { Field } from './Field'

export const SelectedItem = ( { selectedItem } ) => {
  const itemRef = React.useRef( null )

  const [ open, setOpen ] = React.useState( false )

  const onOpen = React.useCallback( ( isTrue ) => {
    if ( isTrue ) {
      itemRef.current.style.maxHeight = null
    } else {
      itemRef.current.style.maxHeight = `${ itemRef.current.scrollHeight }px`
    }
    setOpen( !isTrue )
  }, [ open, itemRef ] )

  return (
    <div className={ ` mb-2` }>

      <button onClick={ () => onOpen( open ) } className={ `flex items-center  text-black max-w-full min-w-full mb-2 text-base border-b-2 border-b-state-200 py-2` }>

        <div className={ `w-5` }>
          <Chevron active={ open } />
        </div>

        <div className={ `truncate w-full text-left` }>
          { selectedItem.itemName } { `(${ selectedItem?.width }' x ${ selectedItem?.length }')` }
        </div>

      </button>

      <div ref={ itemRef } className={ `max-h-0 overflow-hidden shadow-lg text-black` }>
        <Field item={ selectedItem } property={ `name` } />
        <Field item={ selectedItem } property={ `length` } />
        <Field item={ selectedItem } property={ `width` } />
        <Field item={ selectedItem } property={ `lift_range` } />
        <Field item={ selectedItem } property={ `model` } />
        <Field item={ selectedItem } property={ `no_of_cylinders` } />
        <Field item={ selectedItem } property={ `weight_capacity` } />
        <Field item={ selectedItem } property={ `category` } />
        <Field item={ selectedItem } property={ `materials` } />
      </div>

    </div>
  )
}
