import React from 'react'
import { NoAccountError } from './NoAccountError'


export const AccountSettings = () => {
  return (
    <div>
        <div className='container__account-settings'>
            <div className='no-Account'>
                <NoAccountError/>
            </div>
        </div>
    </div>
  )
}
