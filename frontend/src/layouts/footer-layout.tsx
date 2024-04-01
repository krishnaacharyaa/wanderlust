function footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <footer className="flex flex-col items-center sm:flex-row min-h-[6vh] sm:justify-between py-2 sm:py-3 bg-footer-background text-white text-center">
          <section className="text-base sm:pl-4 md:pl-8 lg:pl-16">
                WanderLust
          </section>
          <section className="text-base sm:pr-4 md:pr-16 lg:pr-24">
                <span className="mr-2">&copy;</span>{year} All Rights Reserved
          </section>
      </footer>
  );
}

export default footer;