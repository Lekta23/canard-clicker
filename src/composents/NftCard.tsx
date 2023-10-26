import React from 'react'

type Props = {
    item: any
}

export default function NftCard({ item }: Props) {
    return (
        <div>
            <img src={item.image} alt={item.name} className='w-24 object-contain' /> {/* Use img tag to display the image */}
            {item.name} : {item.speed}
        </div>

    )
}