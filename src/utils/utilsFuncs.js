export function toggleVisibleClass(element) {
  element.classList.toggle("active");
  element.children[0].classList.toggle("hide");
}
