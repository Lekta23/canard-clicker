import React from 'react'

type Props = {}

export default function Inventory({ }: Props) {
    return (
        <div className=" text-gray-900 bg-white bg-opacity-70  border-black border-2 font-medium rounded-lg text-sm px-24 py-2.5 text-center items-center absolute top-20 right-0 mr-2 mb-2 h-4/5">
            <div className='h-1/8 my-4 w-full flex font-bold text-lg border-b-2 border-black pb-4'>Inventory</div>
            <div className='h-7/8'>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
                <div>bla</div>
            </div>
        </div>
    )
}