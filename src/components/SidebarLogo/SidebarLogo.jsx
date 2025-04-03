import { BrandLogo } from 'Assets/images'
import React from 'react'

export const SidebarLogo = () =>
{
  return (
    <div className={ `flex h-[96px] px-[12px] py-[20px] gap-x-[8px]` }>
      <img src={ BrandLogo } alt="Brand Logo" width={ 43.87 } height={ 56 } className={ `relative h-[56px] w-[43.87px] rounded-[8px]` } />
      <div className={ `grow flex flex-col justify-center items-start bg-transparent` }>
        <div className={ `w-full text-[#005C9B] font-bold text-[14px] leading-[150%] tracking-[-0.02em]` }>Paradise Dock & Lift Inc.</div>
        <div className={ `w-full uppercase text-[#30374F]  font-bold text-[14px] leading-[150%] tracking-[-0.02em]` }>Dock builder tool</div>
      </div>
    </div>
  )
}