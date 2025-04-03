import React, { useEffect, useRef, useState, memo } from 'react';
import { CloseIcon } from 'Assets/svgs';

const Modal = ( {
  children,
  title,
  isOpen = false,
  modalCloseClick,
  modalHeader,
  classes
} ) => {


  return (
    <div
      style={ { zIndex: 100000002 } }
      className={ `modal-holder bg-[#00000099] items-center justify-center ${ isOpen ? 'flex' : 'hidden' }` }>
      <div className={ `shadow p-4 bg-white rounded-lg ${ classes?.modalDialog }` }>
        { modalHeader &&
          <div className={ `flex justify-between border-b pb-2` }>
            <h5 className="font-bold text-center text-lg">{ title }</h5>
            <div className="modal-close" onClick={ modalCloseClick }>
              <CloseIcon />
            </div>
          </div>
        }

        <div className="mt-4">
          { children }
        </div>
      </div>
    </div>
  );
};


const ModalMemo = memo( Modal );
export { ModalMemo as Modal };
