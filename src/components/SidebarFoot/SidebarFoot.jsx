import React from 'react'
import { DownloadIcon, UploadIcon } from 'Assets/svgs'

export const SidebarFoot = ( { onDownloadImage, onDownloadFile, fileRef, onUploadFile, onEstimateModalOpen } ) => {

  return (
    <div className={ `flex flex-col justify-end items-end m-auto h-fit z-50 w-full py-2 px-[20px] bg-white` }>
      <button
        onClick={ () => fileRef.current.click() }
        className={ `text-[#000000] flex justify-start items-center gap-x-5 w-full h-[45px] rounded` }
      >
        <UploadIcon /> Upload File
        <input ref={ fileRef } type="file" hidden onChangeCapture={ ( e ) => onUploadFile( e ) } accept={ `.dock` } />
      </button>

      <button
        className={ `text-[#000000] flex justify-start items-center gap-x-5 w-full h-[45px] rounded` }
        onClick={ onDownloadFile }
      >
        <DownloadIcon /> Download File
      </button>

      <button
        className={ `text-[#000000] flex justify-start items-center gap-x-5 w-full h-[45px] rounded` }
        onClick={ onDownloadImage }
      >
        <DownloadIcon /> Download Image
      </button>

      <button
        className={ `text-white flex justify-center items-center w-full h-[35px] rounded bg-[#0F75BC]` }
        onClick={ onEstimateModalOpen }
      >
        GET ESTIMATE
      </button>
    </div>
  )
}