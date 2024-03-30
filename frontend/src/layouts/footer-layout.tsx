function footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
      <>
      <footer className="relative left-0 bottom-0 sm:h-[8vh] flex flex-col sm:flex-row items-center justify-between sm:py-3 sm:px-5 md:px-8 lg:px-20 text-white bg-[#181818]">
          <section className="text-lg">
                WonderLust
          </section>
          <section className="text-lg">
                © {year} All Rights Reserved
          </section>
      </footer>
      </>
  );
}

export default footer;