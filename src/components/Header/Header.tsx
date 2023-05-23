const Header = () => {
  return (
    <header className={'header flex justify-between'}>
      <button>
        <p className={'text-blue-200 text-2xl font-bold items-center'}>
          Podcaster
        </p>
      </button>
      <div className={'w-6 h-6 rounded-full animate-pulse bg-blue-400'}></div>
    </header>
  )
}

export default Header
