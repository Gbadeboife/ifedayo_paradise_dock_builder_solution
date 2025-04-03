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
  modalDialog: 'relative bg-white w-[800px]',
  modalContent: 'string',
  modalHeader: 'string',
  modalTitle: 'string',
  modalBody: 'string',
  modalFooter: 'string',
  closeButtonClass: 'string',
  saveButtonClass: 'string',
}

const ViewDockImageModal = ( {
  showViewDockImageModal,
  modalCloseClick,
  dockImage
} ) => {
  // const [ step, setStep ] = useState( EstimateSteps.ContactInformation )
  // const [ submitLoading, setSubmitLoading ] = useState( false )
  // const [ errorMessage, setErrorMessage ] = useState( null )
  // const [ hasDealer, setHasDealer ] = useState( Truthy.False )


  const onDownloadClick = useCallback( () => {
    const Anchor = document.createElement( "a" )
    // console.log( "viewDockImageModal", dockImage )
    Anchor.href = dockImage;
    Anchor.download = `dock_image_snapshot.png`;
    Anchor.click();
    // modalCloseClick()
  }, [ dockImage ] )

  return (
    <Modal
      title="DOCK IMAGE"
      isOpen={ showViewDockImageModal }
      classes={ classes }
      modalHeader
      modalCloseClick={ modalCloseClick }
    >
      <div>
        <div className={ `w-full h-[400px] rounded-xl my-3` }>
          <img src={ dockImage } className={ `w-full h-full rounded-xl` } alt="dock_image" />
        </div>

        <div className={ `w-full flex gap-x-2 justify-between items-center` }>
          <InteractiveButton
            className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center hover:scale-95 hover:border-[#084c7c] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px]` }
            backgroundColor={ `#0F75BC` }
            onClick={ onDownloadClick }
          >
            Download
          </InteractiveButton>
        </div>
      </div>



    </Modal>
  );
}


const ViewDockImageModalMemo = memo( ViewDockImageModal );

export { ViewDockImageModalMemo as ViewDockImageModal };
