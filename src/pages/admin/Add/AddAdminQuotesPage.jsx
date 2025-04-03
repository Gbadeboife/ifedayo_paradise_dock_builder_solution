import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { tokenExpireError } from "Src/authContext";
import { GlobalContext, showToast } from "Src/globalContext";
import MkdSDK from "Utils/MkdSDK";
import { isImage } from "Utils/utils";

const AddAdminQuotesPage = () => {
  const { dispatch: globalDispatch } = React.useContext( GlobalContext );
  const schema = yup
    .object( {

      first_name: yup.string().required(),
      last_name: yup.string().required(),
      email: yup.string().required(),
      phone: yup.string().required(),
      lake: yup.string().required(),
      city: yup.string().required(),
      has_dealer: yup.string().required(),
      dealer_id: yup.string().required(),
      dock_connection: yup.string().required(),
      lake_bottom: yup.string().required(),
      will_dock_boat: yup.string().required(),
      comments: yup.string().required(),
      dock_image: yup.string().required(),
      selected_items: yup.string().required(),
      country: yup.string().required(),
    } )
    .required();

  const { dispatch } = React.useContext( GlobalContext );
  const [ fileObj, setFileObj ] = React.useState( {} );

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm( {
    resolver: yupResolver( schema ),
  } );

  const previewImage = ( field, target ) => {
    let tempFileObj = fileObj;
    tempFileObj[ field ] = {
      file: target.files[ 0 ],
      tempURL: URL.createObjectURL( target.files[ 0 ] ),
    };
    setFileObj( { ...tempFileObj } );
  };

  const onSubmit = async ( data ) => {
    let sdk = new MkdSDK();

    try {
      // Local Uploads
      // for (let item in fileObj) {
      //   let uploadResult = await sdk.upload(fileObj[item].file);
      //   data[item] = uploadResult.url;
      // }

      // S3 Uploads
      for ( let item in fileObj ) {
        let formData = new FormData();
        formData.append( 'file', fileObj[ item ].file );
        let uploadResult = await sdk.uploadImage( formData );
        data[ item ] = uploadResult.url;
      }

      sdk.setTable( "quotes" );

      const result = await sdk.callRestAPI(
        {

          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          lake: data.lake,
          city: data.city,
          has_dealer: data.has_dealer,
          dealer_id: data.dealer_id,
          dock_connection: data.dock_connection,
          lake_bottom: data.lake_bottom,
          will_dock_boat: data.will_dock_boat,
          comments: data.comments,
          dock_image: data.dock_image,
          selected_items: data.selected_items,
          country: data.country,
        },
        "POST"
      );
      if ( !result.error ) {
        showToast( globalDispatch, "Added" );
        navigate( "/admin/quotes" );
      } else {
        if ( result.validation ) {
          const keys = Object.keys( result.validation );
          for ( let i = 0; i < keys.length; i++ ) {
            const field = keys[ i ];
            setError( field, {
              type: "manual",
              message: result.validation[ field ],
            } );
          }
        }
      }
    } catch ( error ) {
      console.log( "Error", error );
      setError( "first_name", {
        type: "manual",
        message: error.message,
      } );
      tokenExpireError( dispatch, error.message );
    }
  };

  React.useEffect( () => {
    globalDispatch( {
      type: "SETPATH",
      payload: {
        path: "quotes",
      },
    } );
  }, [] );

  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">Add Quotes</h4>
      <form className=" w-full max-w-lg" onSubmit={ handleSubmit( onSubmit ) }>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="first_name"
          >
            First Name
          </label>
          <input
            placeholder="first_name"
            { ...register( "first_name" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.first_name?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.first_name?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <input
            placeholder="last_name"
            { ...register( "last_name" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.last_name?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.last_name?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            placeholder="email"
            { ...register( "email" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.email?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.email?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            placeholder="phone"
            { ...register( "phone" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.phone?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.phone?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lake"
          >
            Lake
          </label>
          <input
            placeholder="lake"
            { ...register( "lake" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.lake?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.lake?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            placeholder="city"
            { ...register( "city" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.city?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.city?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="has_dealer"
          >
            Has Dealer
          </label>
          <select
            { ...register( "has_dealer" ) }
            className={ `"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.has_dealer?.message ? "border-red-500" : ""
              }` }
          >
            <option value='0' >No</option><option value='1' >Yes</option>
          </select>
          <p className="text-red-500 text-xs italic">
            { errors.has_dealer?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dealer_id"
          >
            Dealer Id
          </label>
          <input
            placeholder="dealer_id"
            { ...register( "dealer_id" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.dealer_id?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.dealer_id?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dock_connection"
          >
            Dock Connection
          </label>
          <select
            { ...register( "dock_connection" ) }
            className={ `"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.dock_connection?.message ? "border-red-500" : ""
              }` }
          >
            <option value='0' >Resting</option><option value='1' >Bolted</option><option value='2' >Other</option>
          </select>
          <p className="text-red-500 text-xs italic">
            { errors.dock_connection?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lake_bottom"
          >
            Lake Bottom
          </label>
          <select
            { ...register( "lake_bottom" ) }
            className={ `"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.lake_bottom?.message ? "border-red-500" : ""
              }` }
          >
            <option value='0' >Rocky</option><option value='1' >Silty</option><option value='2' >Sandy</option>
          </select>
          <p className="text-red-500 text-xs italic">
            { errors.lake_bottom?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="will_dock_boat"
          >
            Will Dock Boat
          </label>
          <select
            { ...register( "will_dock_boat" ) }
            className={ `"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.will_dock_boat?.message ? "border-red-500" : ""
              }` }
          >
            <option value='0' >No</option><option value='1' >Yes</option>
          </select>
          <p className="text-red-500 text-xs italic">
            { errors.will_dock_boat?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comments"
          >
            Comments
          </label>
          <textarea
            placeholder="comments"
            { ...register( "comments" ) }
            className={ `"shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${ errors.comments?.message ? "border-red-500" : ""
              }` }
            rows={ 15 }
          ></textarea>
          <p className="text-red-500 text-xs italic">
            { errors.comments?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dock_image"
          >
            Dock Image
          </label>
          <textarea
            placeholder="dock_image"
            { ...register( "dock_image" ) }
            className={ `"shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${ errors.dock_image?.message ? "border-red-500" : ""
              }` }
            rows={ 15 }
          ></textarea>
          <p className="text-red-500 text-xs italic">
            { errors.dock_image?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="selected_items"
          >
            Selected Items
          </label>
          <textarea
            placeholder="selected_items"
            { ...register( "selected_items" ) }
            className={ `"shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${ errors.selected_items?.message ? "border-red-500" : ""
              }` }
            rows={ 15 }
          ></textarea>
          <p className="text-red-500 text-xs italic">
            { errors.selected_items?.message }
          </p>
        </div>


        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country
          </label>
          <input
            placeholder="country"
            { ...register( "country" ) }
            className={ `"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ errors.country?.message ? "border-red-500" : ""
              }` }
          />
          <p className="text-red-500 text-xs italic">
            { errors.country?.message }
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAdminQuotesPage;
