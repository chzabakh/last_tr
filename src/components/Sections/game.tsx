import React, { useEffect, useState } from 'react'
import Paddle from '@/components/game/paddle'
import Ball from '../game/ball'
const Game = () => {
    const GAME_WIDTH = 1100;
    const GAME_HEIGHT = 700;

    const [ballPosition, setBallPosition] = useState({top: GAME_HEIGHT / 2 - 1, left: GAME_WIDTH / 2 - 1});
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [leftPaddleTop, setLeftPaddle] = useState(150);
    const [rightPaddleTop, setRightPaddle] = useState(150);


    useEffect(() =>
    {
        const handleRightPaddle = (event : any) =>
        {
            const mouse = event.clientY - 60; // thev pos Y for the mouse
            const min = 0;
            const max = GAME_HEIGHT;
            const newTop = Math.max(min, Math.min(max - 60, mouse))
            setRightPaddle(newTop);

        }
        window.addEventListener('mousemove', handleRightPaddle);
        return () => window.removeEventListener('mousemove', handleRightPaddle);

    }, [])

    useEffect(() =>
    {
        const PADDLE_HEIHGT = 60
        const PADDLE_SPEEF = 7
        

    }, [])

      
  return (
    <div className='w-[1100px] overflow-hidden h-[700px] bg-white/20 m-6 relative'>
        <Paddle top={leftPaddleTop} left={10} />
        <Paddle top={rightPaddleTop} left={GAME_WIDTH - 18} />
        <Ball top={ballPosition.top} left={ballPosition.left} />
    </div>
  )
}

export default Game





// const [ballPosition, setBallPosition] = useState({top: 300, left :100});
// const [paddleDirection, setPaddleDirection] = useState(1);
// const [ballDirection, setBallDirection] = useState({x : 1, y: 1});
// const [paddleLeftTop, setLeftPaddleTop] = useState(150);
// const [paddleRightTop, setRightPaddleTop] = useState(150);

// useEffect(() =>
// {   
//     // this code determines where the left paddle ai should move following the ball
//     //if the ball goes outside the top set it to 1 else set it to -1
//     if(paddleLeftTop <= 0 && paddleDirection === -1)
//         setPaddleDirection(1);
//     else if(paddleLeftTop + 60  >= 700 && paddleDirection === 1)
//         setPaddleDirection(-1);

//     if(ballPosition.top > paddleLeftTop + 30)
//     {
//         setLeftPaddleTop(prev =>prev + paddleDirection);
//     }
//     else if(ballPosition.top < paddleLeftTop + 30)
//     {
//         setLeftPaddleTop(prev => prev - paddleDirection)
//     }

// }, [ballPosition, paddleDirection, paddleLeftTop])

// useEffect(() =>
// {
//     //this code follows the right paddle

//     const handleMouseMove = (event: any) => 
//     {
//         const mouse  = event.clientY - 60;
//         const minPaddleTop = 0;
//         const maxPaddleTop = 640; 
//         const boundedPaddleTop = Math.max(minPaddleTop, Math.min(mouse, maxPaddleTop));
    
//         setRightPaddleTop(boundedPaddleTop);
//     }

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);

// }, [])
// useEffect(() => {
//     const GameLoop = setInterval(() => {
//         // Update ball position based on its current direction
//         setBallPosition(prevPosition => ({
//             top: prevPosition.top + ballDirection.y,
//             left: prevPosition.left + ballDirection.x
//         }));

//         // Check for collision with top and bottom walls
//         if (ballPosition.top <= 0 || ballPosition.top >= 690) {
//             setBallDirection(prevDirection => ({
//                 ...prevDirection,
//                 y: -prevDirection.y
//             }));
//         }

//         // Check for collision with paddles
//         if (
//             (ballPosition.left <= 20 && ballPosition.top >= paddleLeftTop && ballPosition.top <= paddleLeftTop + 60) ||
//             (ballPosition.left >= 1060 && ballPosition.top >= paddleRightTop && ballPosition.top <= paddleRightTop + 60)
//         ) {
//             setBallDirection(prevDirection => ({
//                 x: -prevDirection.x,
//                 y: prevDirection.y
//             }));
//         }
//     }, 20);

//     return () => clearInterval(GameLoop);
//   }, [ballDirection, ballPosition, paddleLeftTop, paddleRightTop]);