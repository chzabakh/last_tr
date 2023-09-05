
import React from 'react'
import style from '@/styles/loader.module.scss'
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (

        <>
                <div className={style.content}>
                <div className={style.player_one}></div>
                <div className={style.player_two}></div>
                <div className={style.ball}></div>
                </div>
        </>
    )
}