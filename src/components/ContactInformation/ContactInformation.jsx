import React, { memo, useState, useCallback, useEffect } from 'react';
import { ArrowRrightIcon } from 'Assets/svgs';
import { EstimateSteps, Tables, Truthy } from 'Utils/constants';
import MkdSDK from 'Utils/MkdSDK';

const sdk = new MkdSDK()
const ContactInformation = ( {
  step,
  onStepChange,
  hasDealer,
  onHasDealerChange,
  onDealerChange,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setLake,
  setCity,
  setCountry,
} ) => {

  const [ TC, setTC ] = useState( false )
  const [ dealers, setDealers ] = useState( [] )

  const getDealers = useCallback( ( table ) => {
    ( async () => {
      try {
        const result = await sdk.getItems( table )
        setDealers( result?.model )
      } catch ( error ) {
        console.log( error.message )
      }
    } )()
  }, [ dealers ] )

  useEffect( () => {
    if ( !dealers.length ) {
      getDealers( Tables.Dealers )
    }
  }, [ dealers ] )

  {/* ContactInformation */ }
  return (
    <div className={ `h-[500px] max-h-[500px] overflow-auto ${ step === EstimateSteps.ContactInformation ? '' : 'hidden' }` }>

      <div>
        <div className={ `flex items-center gap-x-2` }>
          <p className={ ` uppercase text-[#0F75BC] leading-[150%] tracking-wide text-[18px] font-bold` }>Contact information</p>
          <span className={ `text-[#4A5578] leading-[150%] tracking-tight text-[14px] font-medium` }>(1 of 3)</span>
        </div>
      </div>
      <div className={ `` }>
        <div className={ `flex w-full px-0 gap-x-2 justify-between items-center ` }>
          <fieldset className="cus-input w-1/2">
            <label
              htmlFor="firstName"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >
              <span className={ `text-red-600 mr-2` }>*</span>First Name
            </label>
            <div className="relative mb-6">
              {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                />
              </div> */}
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="John"
                onChange={ ( e ) => setFirstName( e.target.value ) }
              />
            </div>
          </fieldset>
          <fieldset className="cus-input w-1/2">
            <label
              htmlFor="lastName"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >
              <span className={ `text-red-600 mr-2` }>*</span>Last Name
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                /> */}
              </div>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Doe"
                onChange={ ( e ) => setLastName( e.target.value ) }
              />
            </div>
          </fieldset>
        </div>
        <fieldset className="cus-input">
          <label
            htmlFor="email"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2` }>*</span>Email
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                /> */}
            </div>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="JohnDoe@example.com"
              onChange={ ( e ) => setEmail( e.target.value ) }
            />
          </div>
        </fieldset>
        <fieldset className="cus-input">
          <label
            htmlFor="phoneNumber"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2` }>*</span>Telephone
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                /> */}
            </div>
            <input
              type="tel"
              id="phoneNumber"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              // placeholder="James"
              onChange={ ( e ) => setPhone( e.target.value ) }
            />
          </div>
        </fieldset>
        <div className={ `flex w-full px-0 gap-x-2 justify-between items-center ` }>
          <fieldset className="cus-input w-1/3">
            <label
              htmlFor="lake"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >
              <span className={ `text-red-600 mr-2` }>*</span>Location
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                /> */}
              </div>
              <input
                type="text"
                id="lake"
                className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Lake"
                onChange={ ( e ) => setLake( e.target.value ) }
              />
            </div>
          </fieldset>
          <fieldset className="cus-input w-1/3">
            <label
              htmlFor="city"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >
              <span className={ `text-red-600 mr-2` }>*</span>City
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {/* <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                /> */}
              </div>
              <input
                type="text"
                id="city"
                className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="City"
                onChange={ ( e ) => setCity( e.target.value ) }
              />
            </div>
          </fieldset>
          <fieldset className="cus-input w-1/3">
            <label
              htmlFor="country"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >
              <span className={ `text-red-600 mr-2` }>*</span>Country
            </label>
            <div className="relative mb-6">
              {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                />
              </div> */}
              <select
                type="text"
                id="country"
                className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Country"
                onChange={ ( e ) => setCountry( e.target.value ) }
              >
                <option></option>
                <option value={ `Canada` }>Canada</option>
              </select>
            </div>
          </fieldset>
        </div>
        <fieldset className="cus-input">
          <label
            // htmlFor="city"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2` }>*</span>Are you currently working with a Dealer in your area?
          </label>
          <div className="relative flex items-center justify-start mb-6">
            <input
              type="radio"
              name="dealer"
              id="yesDealer"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[44px] pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={ () => onHasDealerChange( Truthy.True ) }
            />
            <label
              htmlFor="yesDealer"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >Yes
            </label>
            <input
              type="radio"
              name="dealer"
              id="noDealer"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[44px] pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={ () => onHasDealerChange( Truthy.False ) }
            />
            <label
              htmlFor="noDealer"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >No
            </label>
          </div>
        </fieldset>
        { hasDealer ?
          <fieldset className="cus-input">
            <label
              htmlFor="dealers"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >
              <span className={ `text-red-600 mr-2` }>*</span>Dealers
            </label>
            <div className="relative mb-6">
              {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                className="w-5 h-5 object-contain"
                src={ `` }
              />
              </div> */}
              <select
                id="dealers"
                className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                placeholder="Delaers"
                onChange={ ( e ) => onDealerChange( e.target.value ) }
              >
                <>
                  <option></option>
                  { dealers?.length ? dealers.map( ( dealer ) => (
                    <option key={ dealer?.id } value={ dealer?.id }>{ dealer?.name }</option>
                  ) )
                    : null }
                </>
              </select>
            </div>
          </fieldset>
          : null
        }
        <fieldset className="cus-input">
          <div className="relative flex items-center justify-start mb-6">

            <input
              // ref={tcRef}
              type="checkbox"
              name="desclaimer"
              id="desclaimer"
              checked={ TC }
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[44px] pl-0 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none self-start mt-1"
              onChange={ ( e ) => setTC( e.target.checked ) }
            />
            <label
              htmlFor="desclaimer"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >Terms And Conditions
            </label>
          </div>
        </fieldset>
      </div>
      <div className={ `flex w-full justify-center bg-transparent ` }>
        <button
          disabled={ !TC }
          className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center bg-[#0F75BC] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px]` }
          onClick={ () => onStepChange( EstimateSteps.LakeSurrounding ) }
        >
          Continue <ArrowRrightIcon />
        </button>
      </div>
    </div>
  );
}


const ContactInformationMemo = memo( ContactInformation );

export { ContactInformationMemo as ContactInformation };
