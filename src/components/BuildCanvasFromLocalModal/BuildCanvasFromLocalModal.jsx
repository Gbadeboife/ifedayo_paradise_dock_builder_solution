import React, { memo, useState, useCallback } from 'react';
import { Modal } from 'Components/Modal';
import { InteractiveButton } from 'Components/InteractiveButton';
// import { ArrowLeftIcon, ArrowRrightIcon, GreenTickIcon } from 'Assets/svgs';
// import { dock_image, EstimateSteps, Tables, Truthy } from 'Utils/constants';
// import { ContactInformation } from 'Components/ContactInformation';
// import { LakeSurroundings } from 'Components/LakeSurroundings';
// import { Comments } from 'Components/Comments';
import MkdSDK from 'Utils/MkdSDK';

const sdk = new MkdSDK()
const classes = {
  modal: 'string',
  modalDialog: 'relative bg-white w-[500px]',
  modalContent: 'string',
  modalHeader: 'string',
  modalTitle: 'string',
  modalBody: 'string',
  modalFooter: 'string',
  closeButtonClass: 'string',
  saveButtonClass: 'string',
}

const BuildCanvasFromLocalModal = ( {
  showBuildCanvasFromLocalModal,
  modalCloseClick,
  editor
} ) => {
  // const [ step, setStep ] = useState( EstimateSteps.ContactInformation )
  // const [ submitLoading, setSubmitLoading ] = useState( false )
  // const [ errorMessage, setErrorMessage ] = useState( null )
  // const [ hasDealer, setHasDealer ] = useState( Truthy.False )


  const onConfirm = useCallback( () => {
    const json = JSON.parse( localStorage.getItem( "dock" ) )
    editor.loadFromJSON( json, () => {
      editor.renderAll()
    }, ( o ) => {
      // console.log( o )
    } )
    modalCloseClick()
  }, [ editor ] )

  return (
    <Modal
      title="CONTINUE FROM LAST SAVE"
      isOpen={ showBuildCanvasFromLocalModal }
      classes={ classes }
      modalHeader
      modalCloseClick={ modalCloseClick }
    >
      <div>
        <div className={ `my-3` }>
          Would You Like to Continue Building Dock From Last Save?
        </div>

        <div className={ `w-full flex gap-x-2 justify-between items-center` }>
          <button
            className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center bg-[#0F75BC] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px]` }
            onClick={ modalCloseClick }
          >No
          </button>

          <button
            className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center bg-[#0F75BC] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px]` }
            onClick={ onConfirm }
          >Yes
          </button>
        </div>
      </div>



    </Modal>
  );
}


const BuildCanvasFromLocalModalMemo = memo( BuildCanvasFromLocalModal );

export { BuildCanvasFromLocalModalMemo as BuildCanvasFromLocalModal };
