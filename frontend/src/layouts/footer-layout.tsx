function footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
      <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between py-5 sm:px-20 text-white bg-[#181818]">
          <section className="text-lg">
                WonderLust
          </section>
          <section className="text-lg">
                © {year} All Rights Reserved
          </section>
      </footer>
  );
}

export default footer;