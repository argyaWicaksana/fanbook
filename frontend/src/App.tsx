import { useState } from 'react'
import Header from './components/Header'
import CommentForm from './components/CommentForm'

function App() {

  return (
    <div className='flex gap-5 flex-col'>
      <Header />
      <CommentForm />
    </div>
  )
}

export default App
