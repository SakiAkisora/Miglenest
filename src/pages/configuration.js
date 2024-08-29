import React from 'react';
import { AsideConfig } from '../complements/asideConfig';
import { Routes, Route } from 'react-router-dom';
import AccountSettings from '../pages/accountSettings';
import { NotificationsSettings } from './NotificationsSettings';
import LanguageSettings from '../pages/languageSettings';
import { PrivacyPolicy } from './privacy';
import { AdvancedSettings } from './advanced-settings';

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
  );
}

export default Configuration;
