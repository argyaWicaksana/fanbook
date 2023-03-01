import Header from './components/Header'
import { CommentSection } from './components/CommentForm'

function App() {

  return (
    <div className='flex gap-5 flex-col'>
      <Header />
      <CommentSection />
    </div>
  )
}

export default App
