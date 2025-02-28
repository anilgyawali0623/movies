import React from 'react'
import Card from '../components/Card'
import useFetchData from '../customHook/customHook';
function CardSection() {
   const {data,loading , error}= useFetchData(`movie/getallmovies`)
    console.log(data);
  return (
    <div className='px-14 w-full m-auto mt-8 '>
    <div className='flex flex-row text-sm gap-x-3 mb-4'>
      <h1 className='text-lg text-white'>Now Showing</h1>
      <h1 className='text-lg text-white'>Coming Soon</h1>
    </div>
     <div className='card-section flex flex-wrap gap-x-10 gap-y-7 flex-row'>
      {
        data.map(({name:title, genre, ageRating:rating, _id})=>(
     <Card title={title} genre={genre} rating={rating} poster={"a"} id={_id}/>

        ))
      }


     </div>
    </div>
  )
}

export default CardSection
