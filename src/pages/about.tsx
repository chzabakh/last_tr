import Layout from '@/components/Layout/layout'
import Card from '@/components/Sections/card'
import Stars from '@/components/Sections/stars'

import React, { useState } from 'react'

const contributers = [
  {
    id: 1,
    name: "oufisaou",
    linkedin: "https://www.linkedin.com/in/oumaimafisaoui/",
    github: "https://github.com/Oumaimafisaoui",
    picture: "/oufisaou.jpeg",
  },
  {
    id: 2,
    name: "oufisaou",
    linkedin: "https://www.linkedin.com/in/oumaimafisaoui/",
    github: "https://github.com/Oumaimafisaoui",
    picture: "/oufisaou.jpeg",

  },
  {
    id: 3,
    name: "oufisaoum",
    linkedin: "https://www.linkedin.com/in/oumaimafisaoui/",
    github: "https://github.com/Oumaimafisaoui",
    picture: "/oufisaou.jpeg",
  },
  {
    id: 4,
    name: "oufisaouj",
    linkedin: "https://www.linkedin.com/in/oumaimafisaoui/",
    github: "https://github.com/Oumaimafisaoui",
    picture: "/oufisaou.jpeg",
  }
]


const About = () => {
  return (
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen max-h-screen">
      <Layout>
        <Stars />
        <div className='flex flex-col gap-2 w-full h-[70%]'>
        <div className='self-center text-[30px] font-code'>The Team:</div>
        <div className="flex flex-row items-center justify-evenly max-h-ful w-full h-full">
          {contributers.map((member) => (
            <Card
              key={member.id}
              name={member.name}
              linkedin={member.linkedin}
              github={member.github}
              picture={member.picture}
            />
          ))}
        </div>
        </div>
      </Layout>
    </div>
  );
};

export default About
