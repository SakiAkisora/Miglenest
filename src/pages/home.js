import React from 'react'
import { AsideRight } from '../complements/AsideRight';
import { ErrorPost } from '../complements/errorPost';

export const Home = () => {
  return (
    <div className='HomePage'>
        <ErrorPost/>
        <AsideRight/>
    </div>
  )
}
export default Home;