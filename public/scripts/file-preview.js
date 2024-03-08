const filePickerElement = document.getElementById("image");
const imagePreview = document.getElementById("image-preview");
const imagePreviewSaved = document.getElementById("image-preview-saved");
function showPreview() {
  const files = filePickerElement.files;
  if (!files || files.length === 0) {
    return;
  }
  const pickedFile = files[0];
  imagePreview.src = URL.createObjectURL(pickedFile);
  imagePreview.style.display = "block";
  imagePreviewSaved.style.display = "none";
}

filePickerElement.addEventListener("change", showPreview);
