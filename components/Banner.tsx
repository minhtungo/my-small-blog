const Banner = () => {
  return (
    <section className="">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-10 lg:py-0">
        <div className="space-y-5">
          <h1 className="max-w-xl font-serif text-6xl">
            My personal blog website
          </h1>
          <h2>Hi, my name is Minh Tu Ngo!</h2>
        </div>
        <img
          className="hidden max-h-72 md:inline-flex lg:max-h-80"
          src="/static/images/avatar.png"
          alt=""
        />
      </div>
    </section>
  )
}
export default Banner
