import React, { useEffect } from 'react'
import Router from 'next/router'
const success = () => {

    useEffect(()=>
    {
        setTimeout(() =>
        {
            window.close()
        }, 2000)
    }, [])
  return (
    <>
        <div>You are in!</div>
    </>
  )
}

export default success