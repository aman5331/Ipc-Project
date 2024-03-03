function lookupPincode() {
  const pincodeInput = document.getElementById("pincodeInput");
  const resultContainer = document.getElementById("result");
  const loader = document.getElementById("loader");

  const pincode = pincodeInput.value.trim();

  // Reset result and hide loader
  resultContainer.innerHTML = "";
  loader.style.display = "none";

  // Check if the pincode is 6 digits
  if (pincode.length !== 6 || isNaN(pincode)) {
    alert("Please enter a valid 6-digit pincode.");
    return;
  }

  // Show loader while fetching data
  loader.style.display = "block";

  // API endpoint
  const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Hide loader after fetching data
      loader.style.display = "none";

      // Check if the API response has data
      if (data && data[0] && data[0].PostOffice) {
        const postalData = data[0].PostOffice;
        displayResult(postalData);
      } else {
        alert("Couldn't find postal data for the entered pincode.");
      }
    })
    .catch((error) => {
      // Hide loader on error
      loader.style.display = "none";
      alert("Error fetching data from the API.");
      console.error(error);
    });
}

function displayResult(postalData) {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = `
      <p><strong>Post Office Name:</strong> ${postalData[0].Name}</p>
      <p><strong>Branch Type - Delivery Status:</strong> ${postalData[0].BranchType} - ${postalData[0].DeliveryStatus}</p>
      <p><strong>District:</strong> ${postalData[0].District}</p>
      <p><strong>State:</strong> ${postalData[0].State}</p>
  `;
}
