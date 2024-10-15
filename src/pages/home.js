import React from 'react'
import { AsideRight } from '../complements/AsideRight.js'
import { ErrorPost } from '../complements/errorPost.js'

export const Home = () => {
  return (
    <div className='HomePage'>
        <AsideRight/>
        <ErrorPost/>
    </div>
  )
}
export default Home
