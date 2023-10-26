import React from 'react';

type Props = {
    items: any[]; // Assuming each item object has a 'name' and 'speed' property
    total: number;
};

const itemImages: { [key: string]: string } = {
    'Plongée': 'https://ipfs.io/ipfs/bafkreihuhv2bjqub25z4zivk6txj5pwvfeqorjn7slkkcyv35askzarepm', // Replace 'path_to_plongee_image' with the actual image path
    'Vol': 'https://ipfs.io/ipfs/bafybeifyp7exyx6vedoubxxul2q7auay2i6s5upfes7ig6b2oqaqa3op2i', // Replace 'path_to_vol_image' with the actual image path
    'Blé': 'https://ipfs.io/ipfs/bafkreieou73gwj7xqh3piyt7xcjean6wi4yp6pen3vagdwz7tmlek4uxvu',
    'Mare': 'https://ipfs.io/ipfs/bafkreie5sgvor7nwwhx7dwg6atfdpb7lwbqmhdyff7yh4mpy6ept6o7hpm',
    'Oeufs': 'https://ipfs.io/ipfs/bafkreia7goo4xdvwpnb5yqikfgvwefs472dv33lf7hse6gobwlllmvtgc4',
    'Renard': 'https://ipfs.io/ipfs/bafkreigihyblpr5c5fw4ivymncagraazjnwokr4dt66jnzg4ijiaa45yem',
    'Caneton': 'https://ipfs.io/ipfs/bafkreigojnbi6tsosu6dre7okxyztv7n4uxf7kh3czo6c2t4qtp7gd344u',

};


export default function Inventory({ items }: Props) {
    const itemCounts: { [key: string]: number } = {};
    const itemSpeeds: { [key: string]: number } = {};

    // Count occurrences of each item and accumulate speeds
    items.forEach((item: any) => {
        const itemName = item.name; // Replace with the actual property name if needed
        const itemSpeed = item.speed; // Replace with the actual property name if needed
        itemCounts[itemName] = (itemCounts[itemName] || 0) + 1;
        itemSpeeds[itemName] = (itemSpeeds[itemName] || 0) + itemSpeed;
    });

    // Display unique items with their images, counts, speeds, and total speed
    return (
        <div className="text-gray-900 bg-white bg-opacity-70 border-black border-2 font-medium rounded-lg text-sm px-4 py-2.5 text-center absolute top-20 right-0 mr-2 mb-2 h-4/5 overflow-y-auto">
            <div className='h-1/8 my-4 w-full flex font-bold text-lg border-b-2 border-black pb-4'>
                <div>Inventory</div>
            </div>
            <div className='h-7/8 grid grid-cols-3 gap-4'>
                {Object.keys(itemCounts).map((itemName, index) => (
                    <div key={index}>
                        <img src={itemImages[itemName]} alt={itemName} style={{ width: '100px', height: '100px' }} />
                        <p>{itemName}</p>
                        <p>Count: {itemCounts[itemName]}</p>
                        <p>Speed: {Math.floor((itemSpeeds[itemName]) * 10) / 10}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
