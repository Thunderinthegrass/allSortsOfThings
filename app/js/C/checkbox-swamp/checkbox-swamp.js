const checkbox = document.querySelector(".checkbox");
const label = document.querySelector(".checkbox-label");
const checkboxSwamp = document.querySelector(".checkbox-swamp");

let checkTheme = () => {
  label.classList.add("transitionNone");
  checkboxSwamp.classList.add("transitionNone");

  if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "lite");
  }

  let theme = localStorage.getItem("theme");

  if (theme == "lite") {
    checkboxSwamp.classList.remove("dark");
    checkboxSwamp.classList.add("lite");

    label.classList.add("active");

    checkbox.checked = false;
  } else if (theme == "dark") {
    checkboxSwamp.classList.remove("lite");
    checkboxSwamp.classList.add("dark");

    label.classList.remove("active");

    checkbox.checked = true;
  }
};

label.addEventListener("click", () => {
  if (label.classList.contains("transitionNone")) {
    label.classList.remove("transitionNone");
    checkboxSwamp.classList.remove("transitionNone");
  }

  if (!checkbox.checked) {
    label.classList.add("active");
    checkboxSwamp.classList.add("lite");
    checkboxSwamp.classList.remove("dark");

    localStorage.setItem("theme", "lite");
  } else {
    label.classList.remove("active");
    checkboxSwamp.classList.add("dark");
    checkboxSwamp.classList.remove("lite");

    localStorage.setItem("theme", "dark");
  }
});

window.onload = checkTheme;
