import Link from 'next/link'

const Header = () => {
  return (
    <nav className="">
      <header className="mx-auto flex max-w-7xl justify-between py-5">
        <div className="flex items-center space-x-5">
          <Link href="/">
            <h1 className='text-xl'>Minh Tu Ngo</h1>
          </Link>
          <div className="hidden items-center space-x-5 md:inline-flex">
            <h3>About</h3>
            <h3>Contact</h3>
            <h3 className="rounded-full bg-green-600 px-4 py-1 text-white">
              Follow
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-5 ">
          <h3>Sign In</h3>
          <h3 className="rounded-full bg-blue-400 px-4 py-1 text-black">
            Get Started
          </h3>
        </div>
      </header>
    </nav>
  )
}
export default Header
