function footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
      <footer className="w-full text-center self-end absolute bottom-0 sm:h-[7vh] flex flex-col sm:flex-row items-center justify-between sm:px-4 md:px-[2rem] lg:px-[4rem] text-white bg-[#181818]">
          <section className="text-[16px]">
                WanderLust
          </section>
          <section className="text-[16px]">
                <span className="mr-2">&copy;</span>{year} All Rights Reserved
          </section>
      </footer>
  );
}

export default footer;