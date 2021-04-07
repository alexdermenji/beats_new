(function () {
  const left = document.querySelector(".slider__arrows-prev");
  const right = document.querySelector(".slider__arrows-next");
  const container = document.querySelector(".slider__list");

  const slidersCount = document.querySelectorAll(".slider__item").length;
  let sliderSize = container.offsetWidth;
  let currentPosition = 0;

  $(window).resize(function () {
    sliderSize = container.offsetWidth;
  });

  container.addEventListener("resize", () => {
    console.log(resize);
    sliderSize = container.offsetWidth;
  });

  right.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPosition === -((slidersCount - 1) * sliderSize)) {
      currentPosition = 0;
      container.style.transform = `translate(${currentPosition}px)`;
    } else {
      currentPosition = currentPosition - sliderSize;
      container.style.transform = `translate(${currentPosition}px)`;
    }
  });

  left.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentPosition !== 0) {
      currentPosition = currentPosition + sliderSize;
      container.style.transform = `translate(${currentPosition}px)`;
    } else {
      currentPosition = currentPosition - sliderSize;
      container.style.transform = `translate(${currentPosition}px)`;
    }
  });
})();
