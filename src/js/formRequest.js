(function () {
  const myForm = document.getElementById("form");
  const orderBtn = document.getElementById("orderBtn");
  const formOverlay = document.querySelector(".form-overlay");
  const modalMenu = document.querySelector(".modal");
  const body = document.body;
  const overlayClose = document.getElementById("formOverlayClose");
  const overlayText = document.querySelector(".form-overlay__text");

  orderBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (validateForm(myForm)) {
      const data = new FormData(myForm);
      const xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
      xhr.send(data);
      xhr.addEventListener("load", () => {
        openOverlay();
        if (xhr.response.status) {
          overlayText.textContent = xhr.response.message;
        } else {
          overlayText.textContent = xhr.response.message;
        }
      });
    } else {
      console.log("Error");
    }
  });

  function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
      valid = false;
    }
    if (!validateField(form.elements.phone)) {
      valid = false;
    }
    if (!validateField(form.elements.comment)) {
      valid = false;
    }

    return valid;
  }

  function validateField(field) {
    field.classList.remove("order__input--error");
    if (!field.checkValidity()) {
      field.classList.add("order__input--error");
    }
    return field.checkValidity();
  }

  function openOverlay() {
    body.style.overflow = "hidden";
    formOverlay.classList.add("form-overlay--open");
    overlayClose.addEventListener("click", function () {
      formOverlay.classList.remove("form-overlay--open");
      body.style.overflow = "";
    });
  }
})();
