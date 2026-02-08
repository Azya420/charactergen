const form = document.getElementById("prompt-form");
const descriptionInput = document.getElementById("description");
const outputText = document.getElementById("output-text");
const outputBox = document.getElementById("output-box");
const copyButton = document.getElementById("copy-button");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const previewImage = imagePreview.querySelector("img");
const previewPlaceholder = imagePreview.querySelector(".preview__placeholder");

const basePrompt =
  "Stwórz zdjęcie figurki 3D tej postaci, bez tła oraz ze zwykłą podstawową podstawką.";

const renderPrompt = (description) => {
  const trimmed = description.trim();
  const lines = [
    "Na podstawie przesłanego zdjęcia oraz opisu postaci:",
    trimmed || "(Brak dodatkowego opisu)",
    "",
    basePrompt,
  ];

  return lines.join("\n");
};

const updateOutput = (text) => {
  outputText.textContent = text;
  const placeholder = outputBox.querySelector(".placeholder");
  if (text) {
    placeholder.style.display = "none";
  } else {
    placeholder.style.display = "block";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateOutput(renderPrompt(descriptionInput.value));
});

copyButton.addEventListener("click", async () => {
  const prompt = outputText.textContent.trim();
  if (!prompt) {
    return;
  }

  try {
    await navigator.clipboard.writeText(prompt);
    copyButton.textContent = "Skopiowano!";
    setTimeout(() => {
      copyButton.textContent = "Skopiuj";
    }, 1800);
  } catch (error) {
    console.error("Nie udało się skopiować promptu", error);
  }
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    previewImage.src = "";
    previewImage.style.display = "none";
    previewPlaceholder.style.display = "block";
    return;
  }

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    previewImage.src = loadEvent.target.result;
    previewImage.style.display = "block";
    previewPlaceholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});
