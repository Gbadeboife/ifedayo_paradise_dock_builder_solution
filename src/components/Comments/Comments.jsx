import React, { memo } from 'react';
import { ArrowLeftIcon, ArrowRrightIcon, } from 'Assets/svgs';
import { EstimateSteps, } from 'Utils/constants';

const Comments = ( { step, onStepChange, onUpdateComment, onSubmit, errorMessage, submitLoading, comments } ) => {

  {/* Comments */ }

  return (

    <div className={ `${ step === EstimateSteps.Comments ? '' : 'hidden' }` }>

      <div>
        <button
          disabled={ submitLoading }
          className={ `text-[#4A5578] leading-[150%] tracking-tight text-[14px] font-medium flex items-center` }
          onClick={ () => onStepChange( EstimateSteps.LakeSurrounding ) }
        >
          <ArrowLeftIcon /> Back
        </button>
        <div className={ `flex items-center gap-x-2` }>
          <p className={ ` uppercase text-[#0F75BC] leading-[150%] tracking-wide text-[18px] font-bold` }>Comments</p>
          <span className={ `text-[#4A5578] leading-[150%] tracking-tight text-[14px] font-medium` }>(3 of 3)</span>
        </div>
      </div>
      <div>
        <fieldset className="cus-input">
          <label
            htmlFor="comments"
            className="text-[#4A5578] leading-[20px] tracking-tight text-[14px] font-medium"
          >
            <span className={ `text-red-600 mr-2` }>*</span>Comments
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {/* <img
                  className="w-5 h-5 object-contain"
                  src={ `` }
                /> */}
            </div>
            <textarea
              name="comments" cols="30" rows="10"
              type="text"
              id="comments"
              disabled={ submitLoading }
              className="bg-gray-50 border-2 border-[#D1D5DB] text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Comments"
              onKeyUp={ ( e ) => onUpdateComment( e.target.value ) }
            >
            </textarea>

          </div>
        </fieldset>
      </div>
      <div className={ `flex w-full justify-center bg-transparent ` }>
        <button
          disabled={ submitLoading || !comments }
          className={ `h-[44px] w-full rounded border-2 border-[#0F75BC] flex justify-center gap-x-2 items-center bg-[#0F75BC] text-[#ffffff] uppercase font-medium tracking-wide leading-[24px] text-[16px] ${ submitLoading || !comments ? "cursor-not-allowed" : "" }` }
          onClick={ onSubmit }
        >
          { submitLoading ?
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> <>Submit Estimate Inquiry <ArrowRrightIcon /></>
            </>
            : <>Submit Estimate Inquiry <ArrowRrightIcon /></>
          }
        </button>
      </div>
      <p className="text-red-500 text-xs italic capitalize">{ errorMessage }</p>
    </div>
  );
}


const CommentsMemo = memo( Comments );

export { CommentsMemo as Comments };
