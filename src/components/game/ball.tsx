import React from 'react'


interface BallProps {
    top: number;
    left: number;
  }

const Ball: React.FC<BallProps> = ({top , left}) => {
    const style: React.CSSProperties = {
        position: 'absolute',
        top:`${top}px`,
        left: `${left}px`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'white',
    }
  return (
    <div style={style}></div>
  )
}

export default Ball