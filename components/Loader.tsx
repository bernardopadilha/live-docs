import { LoaderCircle } from 'lucide-react'

const Loader = () => {
  return (
    <div className='loader'>
      <LoaderCircle className='size-4 animate-spin' />
      Loading...
    </div>
  )
}

export default Loader

//OLHAR