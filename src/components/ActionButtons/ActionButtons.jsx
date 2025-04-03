
import React, { useCallback, useState } from 'react'
// import { GrayMaterial, PerforatedMaterial, WoodgrainMaterial } from 'Assets/images'
// import { MaterialType } from 'Utils/constants'
import { CopyIcon, HandIcon, PasteIcon, PrinterIcon, ReverseLeftIcon, ReverseRightIcon, TrashIcon } from 'Assets/svgs'
import { CanvasModes } from 'Utils/constants'



export const ActionButtons = ( { className, onRedoClick, onUndoClick, onCopy, onPaste, onDeleteSelection, onPrintScreen } ) => {
  const [ mode, setMode ] = useState( CanvasModes.Still )
  // const [ activeMaterial, setActiveMaterial ] = useState( MaterialType.Gray )

  // const changeMode = useCallback( () => {
  //   if ( mode === CanvasModes.Pan ) {
  //     setMode( CanvasModes.Still )
  //     onCanvasModeChange( CanvasModes.Still )
  //   } else if ( mode === CanvasModes.Still ) {
  //     setMode( CanvasModes.Pan )
  //     onCanvasModeChange( CanvasModes.Pan )
  //   }
  // }, [ mode ] )

  return (
    <div className={ `flex gap-x-[8px] bg-transparent border-none ${ className }` }>

      <button onClick={ () => onPrintScreen() }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <PrinterIcon />
        </div>
      </button>

      {/* <button onClick={ changeMode }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <HandIcon />
        </div>
      </button> */}
      <button onClick={ onPaste }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <PasteIcon />
        </div>
      </button>

      <button onClick={ onCopy }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <CopyIcon />
        </div>
      </button>

      <button onClick={ onUndoClick }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <ReverseLeftIcon />
        </div>
      </button>

      <button onClick={ onRedoClick }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <ReverseRightIcon />
        </div>
      </button>

      <button onClick={ onDeleteSelection }>
        <div
          className={ `flex justify-center items-center px-[9px] py-[8px] bg-[#ffffff14] border-2 border-[#404968] rounded cursor-pointer w-[42px] h-[40px]` }
        >
          <TrashIcon />
        </div>
      </button>


    </div>
  )
}