import React, {useState, useEffect} from 'react'
import TrendingMovies from './components/TrendingMovies'
import SignUp from './components/SignUp'
import ReviewList from './components/ReviewList'


export default function MainPage() {


  return (
    <>
    <h1>MainPage</h1>
    {/* <TrendingMovies/> */}
    {/* <SignUp/> */}
    <ReviewList/>
    </>
  )
}
