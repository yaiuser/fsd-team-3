// On Every page load, clear any existing seatNumber in localStorage 
localStorage.removeItem("seatNumber");
console.log("Cleared seatNumber from localStorage");

// Get SeatNumber from link Query
const urlParams = new URLSearchParams(window.location.search);
const seatNumber = urlParams.get("seatNumber");

console.log("Seat number from URL:", seatNumber); // Debugging

// If seatNumber is available in the URL, store it in localStorage
if (seatNumber) {
  localStorage.setItem("seatNumber", seatNumber);
  console.log(
    "Stored seatNumber in localStorage:",
    localStorage.getItem("seatNumber")
  );
            if (seatNumber <= 9) // if seatnumber less than 9, add a 0 infront. 
        document.getElementById("tableNumber").textContent = "0" + seatNumber;
            else {  // else display as it
                document.getElementById("tableNumber").textContent =  seatNumber;
            }
} else {
  alert("No seatNumber found in URL!");
}

function startOrder() {
  console.log("startOrder() function called!"); // Debugging

  // Retrieve seat number from localStorage
  let seatNumber = localStorage.getItem("seatNumber");
  console.log("Retrieved seatNumber from localStorage:", seatNumber); // Debugging

  if (!seatNumber) {
    console.warn("No seat number found in localStorage!");
    document.getElementById("orderId").textContent = "Error: No seat selected!";
    return;
  }

  console.log(
    "Making API request to:",
    `http://localhost:8080/seat/${seatNumber}/order/add`
  );

  fetch(`http://localhost:8080/seat/${seatNumber}/order/add`, {
    method: "POST", // HTTP method
    headers: {
      "Content-Type": "application/json", // Ensure the server understands you're sending JSON
    },
    body: JSON.stringify({}), // Empty object {} or any data you need to send
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data); // Log the entire response to see its structure
      if (data.id) {
        // Store the order ID in localStorage
        localStorage.setItem("orderId", data.id);

        // Optionally, show a success message or proceed to the next page
        console.log(`Order ID: ${data.id} saved in localStorage`);

        // Redirect to the next page
        window.location.href = "index.html"; // Replace with your desired next page
      } else {
        console.error("Order ID not found in response:", data);
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      document.getElementById("orderId").textContent = "Error creating order";
    });
}
