import React from 'react'
import { AsideConfig } from '../complements/asideConfig.js'
import { Routes, Route } from 'react-router-dom'
import AccountSettings from '../pages/accountSettings.js'
import { NotificationsSettings } from './NotificationsSettings.js'
import LanguageSettings from '../pages/languageSettings.js'
import { PrivacyPolicy } from './privacy.js'
import { AdvancedSettings } from './advanced-settings.js'

export const Configuration = () => {
  return (
    <div>
        <AsideConfig/>
        <Routes>
          <Route path="account" element={<AccountSettings />} />
          <Route path="notifications" element={<NotificationsSettings />} />
          <Route path="language" element={<LanguageSettings />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="advanced" element={<AdvancedSettings />} />
        </Routes>
    </div>
  )
}

export default Configuration
