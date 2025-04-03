import React, { memo } from 'react';
import { ArrowLeftIcon, ArrowRrightIcon } from 'Assets/svgs';
import { EstimateSteps, Truthy } from 'Utils/constants';

const LakeSurroundings = ( { step, onStepChange, setWillDockBoat, setDockConnection, setLakeBottom } ) => {

  const dockConnectionMap = [ 'Resting', 'Bolted', 'Other' ]
  const lakeBottomMap = [ 'Rocky', 'Silty', 'Sandy' ]
  // const dock_connection = { 0: 'Resting', 1: 'Bolted', 2: 'Other' }
  // const lake_bottom = { 0: 'Rocky', 1: 'Silty', 2: 'Sandy' }
  // const has_dealer = { 0: 'No', 1: 'Yes' }
  // const will_dock_boat = { 0: 'No', 1: 'Yes' }
  {/* LakeSurroundings */ }

  return (

    <div className={ `${ step === EstimateSteps.LakeSurrounding ? '' : 'hidden' }` }>

      <div>
        <button
          className={ `text-[#4A5578] leading-[150%] tracking-tight text-[14px] font-medium flex items-center` }
          onClick={ () => onStepChange( EstimateSteps.ContactInformation ) }
        >
          <ArrowLeftIcon /> Back
        </button>
        <div className={ `flex items-center gap-x-2` }>
          <p className={ ` uppercase text-[#0F75BC] leading-[150%] tracking-wide text-[18px] font-bold` }>Lake Surroundings</p>
          <span className={ `text-[#4A5578] leading-[150%] tracking-tight text-[14px] font-medium` }>(2 of 3)</span>
        </div>
      </div>
      <div>
        <fieldset className="cus-input">
          <label
            htmlFor="dockConnection"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2` }>*</span> How Will The Dock Be Connected to The Shore?
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <img
                className="w-5 h-5 object-contain"
                src={ `` }
              /> */}
            </div>
            <select
              id="dockConnection"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={ ( e ) => setDockConnection( e.target.value ) }
            >
              <>
                <option></option>
                { dockConnectionMap.map( ( dockConnection, index ) => (
                  <option key={ index } value={ index }>{ dockConnection }</option>
                ) ) }
              </>
            </select>
          </div>
        </fieldset>
        <fieldset className="cus-input">
          <label
            htmlFor="lakeBottom"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2 capitalize` }>*</span> What is the Lake Bottom Like?

          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <img
                className="w-5 h-5 object-contain"
                src={ `` }
              /> */}
            </div>
            <select
              id="lakeBottom"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={ ( e ) => setLakeBottom( e.target.value ) }
            >
              <>
                <option></option>
                { lakeBottomMap.map( ( lakeBottom, index ) => (
                  <option key={ index } value={ index }>{ lakeBottom }</option>
                ) ) }
              </>
            </select>
          </div>
        </fieldset>
        <fieldset className="cus-input">
          <label
            // htmlFor="willDockBoat"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2 capitalize` }>*</span>Will you be docking a boat to this system?
          </label>
          <div className="relative flex items-center justify-start mb-6">
            <input
              type="radio"
              name="willDockBoat"
              id="yesDockBoat"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[44px] p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={ () => setWillDockBoat( Truthy.True ) }
            />
            <label
              htmlFor="yesDockBoat"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >Yes
            </label>
            <input
              type="radio"
              name="willDockBoat"
              id="noDockBoat"
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[44px] pl-10 p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={ () => setWillDockBoat( Truthy.False ) }
            />
            <label
              htmlFor="noDockBoat"
              className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
            >No
            </label>
          </div>
        </fieldset>


      </div>
      <div className={ `flex w-full justify-center bg-transparent ` }>
        <button
          className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center bg-[#0F75BC] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px]` }
          onClick={ () => onStepChange( EstimateSteps.Comments ) }
        >
          Continue <ArrowRrightIcon />
        </button>
      </div>
    </div>
  );
}


const LakeSurroundingsMemo = memo( LakeSurroundings );

export { LakeSurroundingsMemo as LakeSurroundings };
