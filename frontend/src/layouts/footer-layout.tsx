function footer({ children }: any) {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
      <>
        {children}
      <footer className="relative left-0 bottom-0 sm:h-[10vh] flex flex-col sm:flex-row items-center justify-between py-3 sm:py-5 px-5 sm:px-20 text-white bg-[#181818]">
          <section className="text-lg mb-2 sm:mb-0">
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