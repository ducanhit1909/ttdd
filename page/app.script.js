function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("html-path");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("html-path");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML(); // Ensure HTML is included before starting the observers.

  const cameraSection = document.querySelector(".camera-section");
  const objectElement = document.querySelector('.object-animation');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        cameraSection.classList.add("animate");
      } else {
        cameraSection.classList.remove("animate");
      }
    });
  });

  const objectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        objectElement.classList.add("visible");
      } else {
        objectElement.classList.remove("visible");
      }
    });
  });

  if (cameraSection) observer.observe(cameraSection);
  if (objectElement) objectObserver.observe(objectElement);
});
