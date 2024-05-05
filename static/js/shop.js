// Get references to the input fields (DONT STORE THESE IN DATABASE)
let waterQuantityInput = document.getElementById('water-quantity');
let fertilizerQuantityInput = document.getElementById('fertilize-quantity');
let totalCost = 0;	// Total cost of the purchase

document.addEventListener('DOMContentLoaded', function() {
	// Call updateModal initially to set the coin display
	updateModal();
});


function updateTotalCost(){
	totalCost = fertilizerQuantityInput.value*15 + waterQuantityInput.value*10;
	document.getElementById('total-cost').innerHTML = `Total Cost: ${totalCost}`;
}


// Add event listeners to detect input changes
waterQuantityInput.addEventListener('input', handleWaterQuantityChange);
fertilizerQuantityInput.addEventListener('input', handleFertilizerQuantityChange);

// Event handler for water quantity change
function handleWaterQuantityChange(event) {
    const waterQuantity = event.target.value;
    // Do something with the water quantity, such as updating UI or performing calculations
    console.log('Water quantity changed:', waterQuantity);
		updateTotalCost();
}

// Event handler for fertilizer quantity change
function handleFertilizerQuantityChange(event) {
    const fertilizerQuantity = event.target.value;
    // Do something with the fertilizer quantity, such as updating UI or performing calculations
    console.log('Fertilizer quantity changed:', fertilizerQuantity);
		updateTotalCost();
}

// Function to update the modal with current coin count
function updateModal() {
	document.getElementById('coin-display').innerText = coins;
	updateTotalCost();
}

// Function to handle purchasing of items
function purchaseItem() {

	// Check if the user has enough coins
	if (totalCost <= coins) {
		// Update the coin count
		coins -= totalCost;
		updateModal();

		// Perform the purchase action here (e.g., update inventory)
		fertilizationsLeft+=parseInt(waterQuantityInput.value);
		wateringsLeft+=parseInt(fertilizerQuantityInput.value);
		document.getElementById('fertilize-quantity').value = 0;
		document.getElementById('water-quantity').value = 0;
		updateFertilizerCount();
		updateWaterCount();
		totalCost = 0;
		updateTotalCost();
		// Inform the user about the successful purchase
		alert('Purchase successful!');
	} else {
		// Inform the user about insufficient coins
		alert('Insufficient coins!');
	}
}

// Event listeners for purchase buttons
document.getElementById('purchase-btn').addEventListener('click', function() {
	// Perform the purchase action here (e.g., calling the purchaseItem function)
	purchaseItem();
	document.getElementById("buyingAudio").play();
	updateCoinsDisplay(); // Update the coins display
});

// Event listeners for decrease and increase buttons
document.getElementById('fertilize-decrease').addEventListener('click', function() {
  var quantityInput = fertilizerQuantityInput.value;
	console.log(quantityInput);
  if (parseInt(quantityInput) >= 10) {
		document.getElementById("fertilize-quantity").value = parseInt(quantityInput / 10);
		fertilizerQuantityInput.dispatchEvent(new Event('input'));
  }
});

document.getElementById('fertilize-increase').addEventListener('click', function() {
  var quantityInput = fertilizerQuantityInput.value;
  if(parseInt(quantityInput) < 1000000000){
		document.getElementById("fertilize-quantity").value = quantityInput * 10;
		fertilizerQuantityInput.dispatchEvent(new Event('input'));
  }
});

document.getElementById('water-decrease').addEventListener('click', function() {
  var quantityInput = waterQuantityInput.value;
  if (parseInt(quantityInput) >= 10) {
		document.getElementById("water-quantity").value = parseInt(quantityInput / 10);
		waterQuantityInput.dispatchEvent(new Event('input'));
  }
});

document.getElementById('water-increase').addEventListener('click', function() {
  var quantityInput = waterQuantityInput.value;
  if(parseInt(quantityInput) < 1000000000){
		document.getElementById("water-quantity").value = parseInt(quantityInput) * 10;
		waterQuantityInput.dispatchEvent(new Event('input'));
  }
});


