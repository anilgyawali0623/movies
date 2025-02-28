import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchData from '../customHook/customHook';

function NowShowingMovie() {
     const {movieId}= useParams();
     const {data, loading,error}= useFetchData(`movie/${movieId}`);
      console.log(data)
  return (
    <div>
      fasfasf
    </div>
  )
}

export default NowShowingMovie
