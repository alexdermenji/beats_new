(function () {
  const reviewsList = document.querySelectorAll(".reviews__item");
  const reviewsBtns = document.querySelectorAll(".reviews__btn");

  reviewsBtns.forEach((currentValue, currentIndex) => {
    currentValue.addEventListener("click", function (e) {
      e.preventDefault();
      reviewsBtns.forEach((el) => {
        el.classList.remove("reviews__btn--active");
      });
      currentValue.classList.add("reviews__btn--active");
      reviewsList.forEach((element) => {
        element.classList.remove("review--active");
      });
      reviewsList[currentIndex].classList.add("review--active");
    });
  });
})();
