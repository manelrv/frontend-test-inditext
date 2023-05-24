const Header = () => {
  return (
    <header className={'header flex justify-between border-b pb-4'}>
      <button>
        <p className={'items-center text-2xl font-bold text-blue-600'}>
          Podcaster
        </p>
      </button>
      <div className={'h-6 w-6 animate-pulse rounded-full bg-blue-600'}></div>
    </header>
  )
}

export default Header
