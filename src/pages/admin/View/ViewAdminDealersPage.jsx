import React from 'react'
import { useParams } from "react-router-dom";

import { GlobalContext } from "Src/globalContext";
import { tokenExpireError } from "Src/authContext";
import MkdSDK from "Utils/MkdSDK";


let sdk = new MkdSDK();

const ViewAdminDealersPage = () => {
  const { dispatch: globalDispatch } = React.useContext( GlobalContext );

  const { dispatch } = React.useContext( GlobalContext );
  const [ viewModel, setViewModel ] = React.useState( {} );



  const params = useParams();

  React.useEffect( function () {
    ( async function () {
      try {
        sdk.setTable( "dealers" );
        const result = await sdk.callRestAPI( { id: Number( params?.id ) }, "GET" );
        if ( !result.error ) {

          setViewModel( result.model );

        }
      } catch ( error ) {
        console.log( "error", error );
        tokenExpireError( dispatch, error.message );
      }
    } )();
  }, [] );
  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">View Dealers</h4>


      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Name</div>
          <div className="flex-1">{ viewModel?.name }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Address</div>
          <div className="flex-1">{ viewModel?.address }</div>
        </div>
      </div>




    </div>
  );
};

export default ViewAdminDealersPage;
