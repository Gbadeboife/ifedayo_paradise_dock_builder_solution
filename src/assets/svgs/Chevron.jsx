import React from 'react'

export const Chevron = ( { active } ) => {
  return (
    <svg className={ `${ active ? 'rotate-90' : '' }` } width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.93734 10.5208C1.65956 10.7014 1.37817 10.7117 1.09317 10.5517C0.808726 10.3922 0.666504 10.1458 0.666504 9.81248V1.18749C0.666504 0.854152 0.808726 0.607485 1.09317 0.447485C1.37817 0.288041 1.65956 0.298597 1.93734 0.479152L8.729 4.79165C8.979 4.95832 9.104 5.19443 9.104 5.49999C9.104 5.80554 8.979 6.04165 8.729 6.20832L1.93734 10.5208Z" fill="black" />
    </svg>
  )
}
