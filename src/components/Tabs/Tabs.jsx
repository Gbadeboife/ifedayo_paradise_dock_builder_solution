import React from 'react'
import { Tab } from 'Components/Tab'
import { TabNames } from 'Utils/constants'



export const Tabs = ( { activeTab, className, onTabClick } ) => {
  return (
    <div className={ `${ className }` }>
      <Tab
        name={ TabNames.Builder }
        className={ `w-1/2 text-[#111322] h-full text-[14px] leading-[150%] font-medium tracking-tight` }
        active={ activeTab === TabNames.Builder ? true : false }
        onTabClick={ onTabClick }
      />

      <Tab
        name={ TabNames.SelectedItems }
        className={ `w-1/2 text-[#111322] h-full text-[14px] leading-[150%] font-medium tracking-tight` }
        active={ activeTab === TabNames.SelectedItems ? true : false }
        onTabClick={ onTabClick }
      />
    </div>
  )
}