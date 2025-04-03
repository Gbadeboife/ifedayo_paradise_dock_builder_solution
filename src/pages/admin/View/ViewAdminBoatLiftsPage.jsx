import React from 'react'
import { useParams } from "react-router-dom";

import { GlobalContext } from "Src/globalContext";
import { tokenExpireError } from "Src/authContext";
import MkdSDK from "Utils/MkdSDK";

let sdk = new MkdSDK();
const no_of_cylindersMapping = { '2': 2, '4': 4 }

const ViewAdminBoatLiftsPage = () => {
  const { dispatch: globalDispatch } = React.useContext( GlobalContext );

  const { dispatch } = React.useContext( GlobalContext );
  const [ viewModel, setViewModel ] = React.useState( {} );



  const params = useParams();

  React.useEffect( function () {
    ( async function () {
      try {
        sdk.setTable( "boat_lifts" );
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
      <h4 className="text-2xl font-medium">View BoatLifts</h4>


      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Model</div>
          <div className="flex-1">{ viewModel?.model }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Weight Capacity</div>
          <div className="flex-1">{ viewModel?.weight_capacity }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Lift Range</div>
          <div className="flex-1">{ viewModel?.lift_range }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">No Of Cylinders</div>
          <div className="flex-1">{ no_of_cylindersMapping[ viewModel?.no_of_cylinders ] }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Length</div>
          <div className="flex-1">{ viewModel?.length }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Width</div>
          <div className="flex-1">{ viewModel?.width }</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Image</div>
          <div className="flex-1">
            <a href={ viewModel?.image }>View</a>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Top View</div>
          <div className="flex-1">
            <a href={ viewModel?.top_view }>View</a>
          </div>
        </div>
      </div>




    </div>
  );
};

export default ViewAdminBoatLiftsPage;
