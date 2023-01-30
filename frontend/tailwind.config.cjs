/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-image': "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.chosun.com/resizer/iksb_GxiHITk5APwQXOhvaiKYTc=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/MEDK65WNXBHK5OR7CXLNJXPMZA.jpg')"
      },
      backgroundPosition: {
        'center-30': 'center 30%'
      }
    },
  },
  plugins: [],
}
