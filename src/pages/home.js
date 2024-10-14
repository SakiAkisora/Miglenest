import React from 'react'
import { AsideRight } from '../complements/AsideRight.js'
import { ErrorPost } from '../complements/errorPost.js'

export const Home = () => {
  return (
    <div className='HomePage'>
        <ErrorPost/>
        <AsideRight/>
    </div>
  )
}
export default Home
