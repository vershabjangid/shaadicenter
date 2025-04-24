import React from 'react'
import banner from '../.././images/17714407_2101.i402.020_Computer_repair_404_flat_composition.svg'
export function SomethingWentWrong() {
    return (
        <>
            <section className='w-[100%] h-[100vh] bg-[#ffffff] flex justify-center items-center'>
                <div className='w-[100%] px-2'>
                    <img src={banner} alt="" className='w-[70%] m-auto' />
                </div>
            </section>
        </>
    )
}
