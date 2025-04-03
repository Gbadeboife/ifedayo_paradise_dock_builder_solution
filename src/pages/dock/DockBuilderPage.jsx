import React, { useContext } from 'react';
import { Loader } from 'Assets/svgs';
import { DockBuilder } from 'Components/DockBuilder';
import { GlobalContext } from '../../globalContext';

export const DockBuilderPage = () => {

  const { state: { dockLoading } } = useContext( GlobalContext )

  return (
    <div className={ `relative h-screen w-full` }>
      { dockLoading ?
        <div style={ { zIndex: 100000000 } } className={ `w-full h-full fixed flex justify-center items-center bg-[#011e23]` }>
          <Loader className={ `w-20 h-20` } />
        </div>
        : null
      }

      <DockBuilder />

    </div>
  )
}
