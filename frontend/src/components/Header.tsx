export default function Header() {
    // bisa gini di tailwindcss
    // bg-[url("https://images.chosun.com/resizer/iksb_GxiHITk5APwQXOhvaiKYTc=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/MEDK65WNXBHK5OR7CXLNJXPMZA.jpg")]
    return (
        <header className='h-80 flex flex-col justify-center items-center gap-5 bg-header-image bg-center-30 bg-cover text-white'>
            <h1 className='text-5xl'>Artist Name Fan Book</h1>
            <p>Current Temperature: <span>36</span> degrees</p>
        </header>
    )
}
