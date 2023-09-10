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
    name: "sayar",
    linkedin: "https://www.linkedin.com/in/saad-ayar/",
    github: "https://github.com/DayneeBoiiz",
    picture: "/sayar.jpeg",

  },
  {
    id: 3,
    name: "chzabakh",
    linkedin: "https://www.linkedin.com/in/charaf-eddine-zabakh-a52732130/",
    github: "https://github.com/chzabakh",
    picture: "/chzabakh.jpeg",
  },
  {
    id: 4,
    name: "schahid",
    linkedin: "https://www.linkedin.com/in/oumaimafisaoui/",
    github: "https://github.com/Oumaimafisaoui",
    picture: "/schahid.jpeg",
  }
]


const About = () => {
  return (
    <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen max-h-screen">
      <Layout>
        <Stars />
        <div className='flex flex-col gap-2 w-full h-[70%]'>
        <div className='self-center text-[19px] font-inter tracking-wider'>This project is made by:</div>
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
