import React, { useReducer } from "react";
export const GlobalContext = React.createContext();

const initialState = {
  globalMessage: "",
  isOpen: true,
  dockSideBarOpen: true,
  path: "",
  dockLoading: true,
  dockLeft: null,
  dockTop: null,
};

const reducer = ( state, action ) => {
  switch ( action.type ) {
    case "SNACKBAR":
      return {
        ...state,
        globalMessage: action.payload.message,
      };
    case "SETPATH":
      return {
        ...state,
        path: action.payload.path,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    case "TOGGLE_DOCK_SIDEBAR":
      return {
        ...state,
        dockSideBarOpen: action.payload.dockSideBarOpen,
      };
    case "DOCK_LOADING":
      return {
        ...state,
        dockLoading: action.payload,
      };
    case "UPDATE_DOCK_TOP":
      return {
        ...state,
        dockTop: action.payload,
      };
    case "UPDATE_DOCK_LEFT":
      return {
        ...state,
        dockLeft: action.payload,
      };

    default:
      return state;
  }
};

export const showToast = ( dispatch, message, timeout = 3000 ) => {
  dispatch( {
    type: "SNACKBAR",
    payload: {
      message,
    },
  } );

  setTimeout( () => {
    dispatch( {
      type: "SNACKBAR",
      payload: {
        message: "",
      },
    } );
  }, timeout );
};

export const toggleDockSideBar = ( dispatch, dockSideBarOpen ) => {
  dispatch( {
    type: "TOGGLE_DOCK_SIDEBAR",
    payload: {
      dockSideBarOpen
    },
  } );
};

const GlobalProvider = ( { children } ) => {
  const [ state, dispatch ] = useReducer( reducer, initialState );

  // React.useEffect(() => {

  // }, []);

  return (
    <GlobalContext.Provider
      value={ {
        state,
        dispatch,
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
