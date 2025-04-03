import React from 'react'
import { useParams } from "react-router-dom";

import { GlobalContext } from "Src/globalContext";
import { tokenExpireError } from "Src/authContext";
import MkdSDK from "Utils/MkdSDK";
import * as XLSX from "xlsx";
import { DownloadIcon, Loader } from 'Assets/svgs';
import { Table } from 'Components/Table';
import { selectedItemsTableColumns } from 'Utils/constants';
import { useCallback } from 'react';
import { ViewDockImageModal } from 'Components/ViewDockImageModal';


let sdk = new MkdSDK();
const has_dealerMapping = { 0: 'No', 1: 'Yes' }
const dock_connectionMapping = { 0: 'Resting', 1: 'Bolted', 2: 'Other' }
const lake_bottomMapping = { 0: 'Rocky', 1: 'Silty', 2: 'Sandy' }
const will_dock_boatMapping = { 0: 'No', 1: 'Yes' }
const ViewAdminQuotesPage = () => {
  const { dispatch: globalDispatch } = React.useContext( GlobalContext );

  const { dispatch } = React.useContext( GlobalContext );
  const [ viewModel, setViewModel ] = React.useState( {} );
  const [ viewModelSelectedItems, setViewModelSelectedItems ] = React.useState( "" );
  const [ viewModelLoading, setViewModelLoading ] = React.useState( false );
  const [ viewDockImageModal, setViewDockImageModal ] = React.useState( false );
  const [ dockImage, setDockImage ] = React.useState( '' );

  const params = useParams();

  const viewDockImageModalOpen = useCallback( ( image ) => {
    setDockImage( image )
    setViewDockImageModal( true )
  }, [ dockImage, viewDockImageModal ] )

  const viewDockImageModalClose = useCallback( () => {
    setViewDockImageModal( false )
  }, [ viewDockImageModal ] )

  const fetchData = useCallback( () => {

    ( async function () {
      try {
        setViewModelLoading( true )
        sdk.setTable( "quotes" );
        const result = await sdk.callRestAPI( { id: Number( params?.id ) }, "GET" );
        if ( !result.error ) {

          setViewModel( result.model );
          setViewModelSelectedItems( result.model.selected_items )
          setViewModelLoading( false )

        }
      } catch ( error ) {
        setViewModelLoading( false )
        console.log( "error", error )
        tokenExpireError( dispatch, error.message );
      }
    } )();
  }, [ viewModelLoading, viewModel, viewModelSelectedItems ] )
  const onDownloadClick = () => {
    const data = viewModel
    data.selected_items = null
    data.dock_image = null
    const selectedItems = viewModelSelectedItems && ( String( viewModelSelectedItems ).startsWith( "[{\"" ) ) ? JSON.parse( viewModelSelectedItems ) : []
    console.log( selectedItems )
    // return
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet( [ data ] );
    XLSX.utils.book_append_sheet( workbook, worksheet, "Quotation" );
    if ( selectedItems.length ) {
      const worksheet2 = XLSX.utils.json_to_sheet( selectedItems );
      XLSX.utils.book_append_sheet( workbook, worksheet2, "Selected Items" );
    }
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile( workbook, "Paradise_dock_quotation.xlsx" );
  }

  React.useEffect( function () {
    if ( !viewModel.first_name ) {
      fetchData()
    }
  }, [] );
  return (
    <>
      { viewModelLoading ?
        <div className={ `flex w-full h-full justify-center items-center` }>
          <Loader stroke={ `#151515` } className={ `h-14 w-14` } />
        </div>

        :
        <div className="w-full shadow-md rounded  mx-auto p-5">
          <div className={ `flex mb-4` }>

            <h4 className="flex-1 text-2xl font-medium grow">View Quotes</h4>
            <div className={ `flex-1` }>
              <button onClick={ () => onDownloadClick() } type="button" className={ `flex gap-x-2` }>
                <DownloadIcon /> Download
              </button>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">First Name</div>
              <div className="flex-1">{ viewModel?.first_name }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Last Name</div>
              <div className="flex-1">{ viewModel?.last_name }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Email</div>
              <div className="flex-1">{ viewModel?.email }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Phone</div>
              <div className="flex-1">{ viewModel?.phone }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Lake</div>
              <div className="flex-1">{ viewModel?.lake }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">City</div>
              <div className="flex-1">{ viewModel?.city }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Has Dealer</div>
              <div className="flex-1">{ has_dealerMapping[ viewModel?.has_dealer ] }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Dealer Id</div>
              <div className="flex-1">{ viewModel?.dealer_id }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Dock Connection</div>
              <div className="flex-1">{ dock_connectionMapping[ viewModel?.dock_connection ] }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Lake Bottom</div>
              <div className="flex-1">{ lake_bottomMapping[ viewModel?.lake_bottom ] }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Will Dock Boat</div>
              <div className="flex-1">{ will_dock_boatMapping[ viewModel?.will_dock_boat ] }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Comments</div>
              <div className="flex-1">{ viewModel?.comments }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Country</div>
              <div className="flex-1">{ viewModel?.country }</div>
            </div>
          </div>

          <div className="mb-4 mt-4">
            <div className="flex mb-4">
              <div className="flex-1">Dock Image</div>
              <div className="flex-1">
                {/* <a href={ viewModel?.dock_image } target="_blank"> */ }
                <img
                  onClick={ () => viewDockImageModalOpen( viewModel?.dock_image ) }
                  src={ viewModel?.dock_image }
                  alt="Dock Image"
                  height={ 100 }
                  width={ 150 }
                  className={ `rounded-md cursor-pointer` }
                />
                {/* </a> */ }
              </div>
            </div>
          </div>


          <div className="mb-4 mt-4 w-full">
            <div className="grid grid-cols-1 gap-x-5 w-full mb-4 md:justify-between md:items-start">
              <div className="md:w-1/2 grow">Selected Items</div>
              <div className="grow">
                <Table
                  className={ `max-w-full overflow-x-auto` }
                  tableColumns={ selectedItemsTableColumns }
                  tableData={ viewModel?.selected_items && ( String( viewModel?.selected_items ).startsWith( "[{\"" ) ) ? JSON.parse( viewModel?.selected_items ) : [] }
                />
              </div>
              {/* <div className="flex-1">{ viewModel?.selected_items }</div> */ }
            </div>
          </div>
        </div>
      }
      <ViewDockImageModal
        dockImage={ dockImage }
        modalCloseClick={ viewDockImageModalClose }
        showViewDockImageModal={ viewDockImageModal }
      />
    </>
  );
};

export default ViewAdminQuotesPage;
