export const validateFileType = (type) => {
  const validTypes = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
  if (validTypes.includes(type)) return true;
  return false;
};

export const toggleError = (element, showError) => {
  if (showError) {
    element.parentElement.setAttribute("data-error-visible", "true");
    element.parentElement.setAttribute(
      "data-error",
      "Le format du fichier n'est pas correct. Les extensions acceptées sont : png, jpg, jpeg, gif"
    );
  } else {
    element.parentElement.removeAttribute("data-error-visible");
    element.parentElement.removeAttribute("data-error");
  }
};
