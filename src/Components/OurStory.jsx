import React from 'react'

function OurStory() {
  return (
    <div id="story" className='bg-black   pt-20 flex sm:flex-row flex-col   overflow-hidden  '>

        {/* Left Side-Image */}
      <div className='sm:w-1/2 flex justify-center '>
        <img src="image.png" className='w-4/5 max-h-[600px] object-cover shadow-amber-400/40 shadow-lg  border-2 border-amber-600/50 rounded-xl' alt="" />
      </div>

       {/* Right Side-Content */}
      <div className='sm:w-1/2 m-4'>
        <h1 className="text-amber-500 font-serif tracking-wider">OUR STORY</h1>
        <h1 className='font-serif sm:text-5xl text-3xl text-white mt-2'>Meet Chef {" "}<span className='bg-gradient-to-r from-amber-300 to-amber-600  bg-clip-text text-transparent'>Marcel Dubois</span> </h1>
        <p className='mt-3 text-amber-50'>With over 25 years of culinary experience, Chef Marcel brings a unique blend of classical French techniques and modern innovation to every plate.</p>
        <p className='mt-6 text-amber-50 text-sm'>Trained in the finest kitchen of Paris and Lyon,Chef Marcel's passion for perfection has earned La Cuisine three prestigious Michlein stars.Every dish is a testament to his dedication to crafting unforgettable dining experiences.</p>
        <div className='flex md:gap-6 gap-2 mt-8 '>
            <div className='text-center flex  items-center flex-col  border  w-[150px] rounded-lg  shadow-amber-400/40 shadow-lg border-amber-600/40 p-2'>
                <img src="star-amber.svg" className='w-8 h-8' alt="" />
                <h1 className='text-amber-400 md:text-3xl mt-2'>25+</h1>
                <span className="text-gray-300 text-sm mt-2">Years</span>
            </div>
            <div className='text-center flex jsutify-center items-center flex-col  border  w-[150px] rounded-lg  shadow-amber-400/40 shadow-lg border-amber-600/40 p-2'>
                <img src="award.svg" className='w-8 h-8' alt="" />
                <h1 className='text-amber-400 md:text-3xl mt-2'>50+</h1>
                <span className="text-gray-300 text-sm mt-2">Awards</span>
            </div>
            <div className='text-center flex jsutify-center items-center flex-col  border  w-[150px] rounded-lg  shadow-amber-400/40 shadow-lg border-amber-600/40 p-2'>
                <img src="users-amber.svg" className='w-8 h-8' alt="" />
                <h1 className='text-amber-400 md:text-3xl mt-2'>100K+</h1>
                <span className="text-gray-300 text-sm mt-2">Guests</span>
            </div>
        </div>
       <p className="text-yellow-50 italic mb-2 mt-8">
  Cooking is not just about ingredients and recipes. It’s about passion,
  creativity, and bringing people together through food.
</p>
<h1 className="text-amber-500">— La Cuisine Team</h1>

         
      </div>
    </div>
  )
}

export default OurStory
