import Image from 'next/image'
import React from 'react'

const BannerSection = () => {
    return (
        <section className='w-full h-fit py-[100px]'>

            <Image alt='/' width={300} height={400} className='object-cover max-w-[80%] min-w-[80%] w-[80%] max-h-[400px] mx-auto rounded-[40px] relative' src="/images/img_6323.jpg" />
        </section>
    )
}

export default BannerSection