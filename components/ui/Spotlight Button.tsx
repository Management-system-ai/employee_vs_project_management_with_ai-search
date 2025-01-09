'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ghostWithoutFace from '@/public/ghost-without-face.svg';
import goshWithBabyTeeth from '@/public/ghost-with-baby-teeth.svg';
import goshWithHornsAndBigSmile from '@/public/ghost-with-horns-and-big-smile.svg';

const GhostButton = () => {
  const [currentGhostIndex, setCurrentGhostIndex] = useState(0);
  const ghosts = [
    ghostWithoutFace,
    goshWithBabyTeeth,
    goshWithHornsAndBigSmile
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGhostIndex(prev => (prev + 1) % ghosts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <button className="h-17 w-17 flex animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-1 shadow-md transition-all duration-300 hover:rotate-6 hover:scale-110 hover:animate-none hover:from-blue-400 hover:via-green-500 hover:to-yellow-500 hover:shadow-xl">
      <Image
        src={ghosts[currentGhostIndex]}
        alt="Ghost Icon"
        width={60}
        height={60}
        className="transition-all duration-300 hover:rotate-12 hover:scale-125"
      />
    </button>
  );
};

export default GhostButton;
