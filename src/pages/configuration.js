import React from 'react'
import { AsideConfig } from '../complements/asideConfig'
import { Routes, Route } from 'react-router-dom';
import { AccountSettings} from '../complements/accountSettings'
import { NotificationsSettings } from '../complements/NotificationsSettings';

export const Configuration = () => {
  return (
    <div>
        <AsideConfig/>
        <Routes>
          <Route path="account" element={<AccountSettings />} />
          <Route path="notifications" element={<NotificationsSettings />} />
        </Routes>
    </div>
  )
}

export default Configuration;