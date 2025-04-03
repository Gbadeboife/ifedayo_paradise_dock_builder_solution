import React, { useCallback, useContext } from 'react'
import { SidebarLogo } from 'Components/SidebarLogo'
import { GlobalContext } from '../../globalContext'
import { SidebarFoot } from 'Components/SidebarFoot'
import { SidebarBuilder } from 'Components/SidebarBuilder'

export const DockSidebar = ( { onAddItem, onDownloadImage, onDownloadFile, onUploadFile, fileRef, editor, updateModifications, selectedItems, onEstimateModalOpen } ) => {
  const { state, dispatch } = useContext( GlobalContext )
  const { dockSideBarOpen } = state
  let toggleOpen = ( open ) =>
    dispatch( {
      type: "TOGGLE_DOCK_SIDEBAR",
      payload: { dockSideBarOpen: open },
    } );

  const onWheel = useCallback( ( e ) => {
    if ( e.ctrlKey ) {
      return e.preventDefault();//prevent zoom
    }

  }, [] );

  return (
    <div style={ { zIndex: 10000000 } } className={ `flex absolute` }>
      <div className={ `sidebar-holder flex flex-col bg-white max-h-screen ${ !dockSideBarOpen ? "open-nav" : "" }` } onWheel={ onWheel }>
        <SidebarLogo />

        <SidebarBuilder
          onAddItem={ onAddItem }
          editor={ editor }
          updateModifications={ updateModifications }
          selectedItems={ selectedItems }
        />
        <SidebarFoot onDownloadImage={ onDownloadImage } onDownloadFile={ onDownloadFile } onUploadFile={ onUploadFile } fileRef={ fileRef } onEstimateModalOpen={ onEstimateModalOpen } />
      </div>
      <span className='bg-white h-fit' onClick={ () => toggleOpen( !dockSideBarOpen ) }>
        { !dockSideBarOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) }
      </span>
    </div>
  )
}
