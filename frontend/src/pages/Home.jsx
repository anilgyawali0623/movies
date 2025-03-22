import React from 'react';
import ImageSlider from '../components/ImageSlider';
 import img from '../../public/asset2.jpeg'

import CardSection from './CardSection';
import SignUpPage from '../components/SignUp';

function Home() {
  return (
    <div
      className="bg-[url('../../public/asset2.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center flex-col "
    >
      <ImageSlider />
      <CardSection/>
      <SignUpPage/>
    </div>
  );
}

export default Home;
