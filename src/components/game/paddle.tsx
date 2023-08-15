import React from 'react'


interface PaddleProps {
  top: number;
  left: number;
}

const Paddle: React.FC<PaddleProps> = ({top , left}) => {
    const style: React.CSSProperties = {
        position: 'absolute',
        top:`${top}px`,
        left: `${left}px`,
        width: '10px',
        height: '60px',
        backgroundColor: 'white',
    }
  return (
    <div style={style}></div>
  )
}

export default Paddle