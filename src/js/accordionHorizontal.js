(function () {
  const accordionList = document.querySelector(".accordion__list");
  const accordionItems = document.querySelectorAll(".accordion__item");
  const accordionText = document.querySelector(".accordion__text");
  const accordionContent = document.querySelector(".accordion__content");

  accordionItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        e.target.classList.contains("accordion__header") ||
        e.target.classList.contains("accordion__title")
      ) {
        if (item.classList.contains("accordion__item--active")) {
          item.classList.remove("accordion__item--active");
        } else {
          accordionItems.forEach((el) => {
            el.classList.remove("accordion__item--active");
          });
          item.classList.add("accordion__item--active");
        }
      } else {
        return;
      }
    });
  });
})();
