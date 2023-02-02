import React from 'react'

export default function Header() {
    // bisa gini di tailwindcss
    // bg-[url("https://images.chosun.com/resizer/iksb_GxiHITk5APwQXOhvaiKYTc=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/MEDK65WNXBHK5OR7CXLNJXPMZA.jpg")]
    const [temperature, setTemperature] = React.useState(0)

    type Temp = { temp: number }

    React.useEffect(() => {
        const tempApi = async () => {
            try {
                const response = await fetch('http://spartacodingclub.shop/sparta_api/weather/seoul', {
                    method: 'GET'
                })
                const { temp }: Temp = await response.json()

                setTemperature(temp)
            } catch (error) {
                console.log('Error!')
                console.log(error)
            }
        }

        tempApi()
    }, [])

    return (
        <header className='h-80 flex flex-col justify-center items-center gap-5 bg-header-image bg-center-30 bg-cover text-white'>
            <h1 className='text-5xl'>Artist Name Fan Book</h1>
            <p>Current Temperature: <span>{temperature}</span> degrees</p>
        </header>
    )
}
