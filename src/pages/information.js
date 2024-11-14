import React from 'react'
import { AsideInfo } from '../complements/asideInfo.js'
import { AboutUs } from './AboutUs.js'
import { PrivacyPolicy } from './privacy.js'
import { ServiceTerms } from './ServiceTerms.js'
import { CommunityGuidelines } from './CommunityGuidelines.js'
import { Routes, Route } from 'react-router-dom'

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
