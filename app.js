const form = document.getElementById("propertyForm");
const resultBox = document.getElementById("result");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const apiUrl = window.HOMEPILOT_CONFIG.API_URL;

  if (!apiUrl) {
    resultBox.textContent =
      "The AI backend is not connected yet. We will connect it after the website is hosted.";
    return;
  }

  const submitButton = form.querySelector("button");

  const propertyData = {
    mode: document.getElementById("mode").value,
    budget: document.getElementById("budget").value,
    price: document.getElementById("price").value,
    taxes: document.getElementById("taxes").value,
    bedrooms: document.getElementById("bedrooms").value,
    bathrooms: document.getElementById("bathrooms").value,
    goals: document.getElementById("goals").value,
    description: document.getElementById("description").value
  };

  submitButton.disabled = true;
  submitButton.textContent = "Analyzing...";

  resultBox.textContent = "HomePilot AI is reviewing the property.";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(propertyData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "The request failed.");
    }

    resultBox.textContent = data.report;
  } catch (error) {
    resultBox.textContent =
      "Something went wrong:\n\n" + error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Analyze Property";
  }
});
