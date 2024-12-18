import React from 'react';
import vecteezyImage from '../images/vecteezy.jpeg';
import setup2 from '../images/setup2.png';
import setup32 from '../images/setup32.png';

function MyComponent() {
  return (
    <div className="relative flex flex-col md:flex-row items-start gap-12 p-10 bg-gray-50 min-h-screen">
      {/* Text Section */}
      <div className="md:w-1/3 space-y-6 p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">About us</h1>
        <p className="text-gray-700 leading-relaxed">
          Welcome to our site, a unique space designed to connect. Here, you'll find a diverse collection of setups that showcases creativity and technology.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Our platform is designed so everyone can share their setups and inspire others to make their own setups that little bit better.
        </p>
      </div>

      {/* Image Section */}
      <div className="md:w-2/3 flex items-center justify-center relative mt-8"> {/* Added `mt-8` here */}
        {/* Image 1 */}
        <img
          src={vecteezyImage.src}
          alt="Image 1"
          className="w-52 h-52 md:w-80 md:h-80 object-cover shadow-lg rounded-lg relative z-10 transform rotate-2 -mr-8"
        />

        {/* Image 2 */}
        <img
          src={setup32.src}
          alt="Image 2"
          className="w-44 h-44 md:w-64 md:h-64 object-cover shadow-lg rounded-lg relative z-20 transform -rotate-2 -ml-16 -mt-8"
        />

        {/* Image 3 */}
        <img
          src={setup2.src}
          alt="Image 3"
          className="w-64 h-64 md:w-96 md:h-96 object-cover shadow-lg rounded-lg relative z-30 transform rotate-1 -ml-24 -mt-16"
        />
      </div>
    </div>
  );
}

export default MyComponent;




