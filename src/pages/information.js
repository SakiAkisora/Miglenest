import React from 'react'
import { AsideInfo } from '../complements/asideInfo'
import { AboutUs } from './AboutUs';
import { PrivacyPolicy } from './privacy';
import { ServiceTerms } from './ServiceTerms';
import { CommunityGuidelines } from './CommunityGuidelines';
import { Routes, Route } from 'react-router-dom';

export const Information = () => {
  return (
    <div>
        <AsideInfo/>
        <Routes>
        <Route path='about-us' element={<AboutUs />} />
        <Route path='privacy-policy' element={<PrivacyPolicy />} />
        <Route path='terms-of-service' element={<ServiceTerms />} />
        <Route path='community-guidelines' element={<CommunityGuidelines />} />
      </Routes>
    </div>
  )
}
