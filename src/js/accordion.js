(function () {
  const btn = document.querySelectorAll(".team__person");
  const descriptionWrap = document.querySelectorAll(".team__description-wrap");
  const description = document.querySelectorAll(".team__description");
  const triangle = document.querySelectorAll(".team__triangle");

  function hideAccordeon() {
    for (let i = 0; i < descriptionWrap.length; i++) {
      descriptionWrap[i].style.height = "0px";
      descriptionWrap[i].classList.remove("team__description--active");
      triangle[i].classList.remove("team__triangle--up");
    }
  }

  function showAccordeon(element) {
    let height = getComputedStyle(description[element]).height;
    descriptionWrap[element].style.height = height;
    descriptionWrap[element].classList.add("team__description--active");
    triangle[element].classList.add("team__triangle--up");
  }

  for (let i = 0; i < btn.length; i++) {
    let current = btn[i];

    current.addEventListener("click", () => {
      if (descriptionWrap[i].classList.contains("team__description--active")) {
        hideAccordeon();
      } else {
        hideAccordeon();
        showAccordeon(i);
      }
    });
  }
})();
