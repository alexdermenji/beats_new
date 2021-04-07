(function () {
  const sections = $("section");
  const container = $(".wrapper__content");
  const scrollMenu = $(".scroll__list");
  const scrollItems = scrollMenu.find(".scroll__item");
  const device = new MobileDetect(window.navigator.userAgent);
  const isMobile = device.userAgent();

  let inScroll = false;
  sections.first().addClass("section--active");

  $("[data-scroll-to]").click((e) => {
    e.preventDefault();
    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id = ${target}]`);
    performTransition(reqSection.index());
  });

  const countSectionPosition = (sectionEq) => {
    return sectionEq * -100;
  };
  const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
  };

  const changeMenuTheme = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const scrollItem = $(".scroll__item");
    if (menuTheme === "dark") {
      scrollItem.removeClass("scroll__item--light");
    } else {
      scrollItem.addClass("scroll__item--light");
    }

    resetActiveClassForItem(scrollItems, sectionEq, "scroll__item--active");
  };

  const performTransition = (sectionEq) => {
    if (inScroll === false) {
      inScroll = true;
      const position = countSectionPosition(sectionEq);
      changeMenuTheme(sectionEq);
      container.css({
        transform: `translateY(${position}%)`,
      });

      resetActiveClassForItem(sections, sectionEq, "section--active");

      setTimeout(() => {
        inScroll = false;
      }, 1300);
    }
  };

  const scrollViewport = (direction) => {
    const activeSection = sections.filter(".section--active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    if (direction === "next" && nextSection.length) {
      performTransition(nextSection.index());
    }
    if (direction === "prev" && prevSection.length) {
      performTransition(prevSection.index());
    }
  };

  $(window).on("wheel", (e) => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
      scrollViewport("next");
      //next
    }

    if (deltaY < 0) {
      scrollViewport("prev");
      //prev
    }
  });

  window.addEventListener("keydown", function (event) {
    const tagName = event.target.tagName.toLowerCase();
    if (tagName !== "input" && tagName !== "textarea") {
      if (event.code === "ArrowDown") {
        scrollViewport("next");
      }
      if (event.code === "ArrowUp") {
        scrollViewport("prev");
      }
    }
  });

  $(".wrapper").on("touchmove", (e) => {
    e.preventDefault();
  });

  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

  if (isMobile) {
    $("body").swipe({
      swipe: function (event, direction) {
        if (direction === "up") {
          scrollViewport("next");
        }
        if (direction === "down") {
          scrollViewport("prev");
        }
      },
    });
  }
})();
