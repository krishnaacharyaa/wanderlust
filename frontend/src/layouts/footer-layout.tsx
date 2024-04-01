function footer() {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <footer className="mt-auto w-full text-center self-end relative bottom-0 min-h-[7vh] sm:h-[7vh] flex flex-col sm:flex-row items-center justify-between py-3 sm:px-4 md:px-8 lg:px-16 text-white bg-footer-background">
          <section className="text-base">
                WanderLust
          </section>
          <section className="text-base">
                <span className="mr-2">&copy;</span>{year} All Rights Reserved
          </section>
      </footer>
  );
}

export default footer;