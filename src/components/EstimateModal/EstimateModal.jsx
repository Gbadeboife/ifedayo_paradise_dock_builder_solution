import React, { memo, useState, useCallback } from 'react';
import { Modal } from 'Components/Modal';
import { InteractiveButton } from 'Components/InteractiveButton';
import { ArrowLeftIcon, ArrowRrightIcon, GreenTickIcon } from 'Assets/svgs';
import { dock_image, EstimateSteps, Tables, Truthy } from 'Utils/constants';
import { ContactInformation } from 'Components/ContactInformation';
import { LakeSurroundings } from 'Components/LakeSurroundings';
import { Comments } from 'Components/Comments';
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

const EstimateModal = ( {
  showEstimateModal,
  modalCloseClick,
  selectedItems,
  dockImage,
} ) => {
  const [ step, setStep ] = useState( EstimateSteps.ContactInformation )
  const [ submitLoading, setSubmitLoading ] = useState( false )
  const [ errorMessage, setErrorMessage ] = useState( null )
  const [ hasDealer, setHasDealer ] = useState( Truthy.False )

  // Contact Information
  const [ dealer, setDealer ] = useState( 0 )
  const [ firstName, setFirstName ] = useState( '' )
  const [ lastName, setLastName ] = useState( '' )
  const [ email, setEmail ] = useState( '' )
  const [ phone, setPhone ] = useState( '' )
  const [ lake, setLake ] = useState( '' )
  const [ city, setCity ] = useState( '' )
  const [ country, setCountry ] = useState( '' )

  // Lake Surroundings
  const [ dockConnection, setDockConnection ] = useState( '' )
  const [ lakeBottom, setLakeBottom ] = useState( '' )
  const [ willDockBoat, setWillDockBoat ] = useState( Truthy.False )

  // Comments
  const [ comments, setComments ] = useState( "" )

  const onStepChange = useCallback( ( next ) => {
    setStep( next )
  }, [ step ] )

  const onUpdateComment = useCallback( ( comment ) => {
    setComments( comment )
  }, [ comments ] )

  const onSubmit = useCallback( () => {
    ( async () => {
      try {
        setSubmitLoading( true )
        const quoteBody = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          lake: lake,
          city: city,
          dock_connection: dockConnection,
          lake_bottom: lakeBottom,
          country: country,
          dock_image: dockImage,
          has_dealer: hasDealer,
          dealer_id: dealer,
          will_dock_boat: willDockBoat,
          comments: comments,
          selected_items: JSON.stringify( selectedItems )
        }
        const result = await sdk.requestQuote( quoteBody )
        if ( !result?.error ) {
          setSubmitLoading( false )
          setStep( EstimateSteps.InquirySubmitted )
        }
      } catch ( error ) {
        setErrorMessage( error.message )
        setSubmitLoading( false )
      }
    } )()
  }, [ step, submitLoading, errorMessage, comments, hasDealer, dealer, firstName, lastName, email, phone, lake, city, country, dockConnection, lakeBottom, willDockBoat, selectedItems, dockImage ] )

  const onClose = useCallback( () => {
    setStep( EstimateSteps.ContactInformation )
    modalCloseClick()
  }, [ step ] )

  return (
    <Modal
      title="REQUEST AN ESTIMATE"
      isOpen={ showEstimateModal }
      classes={ classes }
      modalHeader
      modalCloseClick={ modalCloseClick }
    >
      {/* ContactInformation */ }
      <ContactInformation
        step={ step }
        onStepChange={ onStepChange }
        hasDealer={ hasDealer }
        onHasDealerChange={ setHasDealer }
        onDealerChange={ setDealer }
        setFirstName={ setFirstName }
        setLastName={ setLastName }
        setEmail={ setEmail }
        setPhone={ setPhone }
        setLake={ setLake }
        setCity={ setCity }
        setCountry={ setCountry }
      />

      {/* LakeSurroundings */ }
      <LakeSurroundings
        step={ step }
        onStepChange={ onStepChange }
        setDockConnection={ setDockConnection }
        setLakeBottom={ setLakeBottom }
        setWillDockBoat={ setWillDockBoat }
      />

      {/* Comments */ }
      <Comments
        step={ step }
        onSubmit={ onSubmit }
        onUpdateComment={ onUpdateComment }
        onStepChange={ onStepChange }
        errorMessage={ errorMessage }
        submitLoading={ submitLoading }
        comments={ comments }
      />

      {/* InquirySubmitted */ }
      <div className={ `${ step === EstimateSteps.InquirySubmitted ? '' : 'hidden' }` }>

        <div>
          <div className={ `flex items-center gap-x-2` }>
            <GreenTickIcon />
            <p className={ ` uppercase text-[#0F75BC] leading-[150%] tracking-wide text-[18px] font-bold` }>Inquiry Submitted</p>
          </div>
        </div>
        <div className={ `flex w-full justify-center bg-transparent ` }>
          <button
            className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center bg-[#0F75BC] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px]` }
            onClick={ onClose }
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  );
}


const EstimateModalMemo = memo( EstimateModal );

export { EstimateModalMemo as EstimateModal };
