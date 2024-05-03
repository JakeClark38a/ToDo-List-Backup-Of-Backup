let coins = 2414; // Variable to store the number of coins


document.addEventListener('DOMContentLoaded', function() {
	// Call updateModal initially to set the coin display
	updateModal();
});

// Function to update the modal with current coin count
function updateModal() {
	document.getElementById('coin-display').innerText = coins;
}

// Function to handle purchasing of items
function purchaseItem(itemType) {
	// Get the quantity of the item to purchase
	var quantity;
	if (itemType === 'fertilizer') {
		quantity = parseInt(document.getElementById('fertilize-quantity').value);
		if(quantity===0){
			return;
		}
	} else if (itemType === 'water') {
		quantity = parseInt(document.getElementById('water-quantity').value);
		if(quantity===0){
			return;
		}
	}

	// Calculate the total cost for the purchase
	var totalCost = 0;
	if (itemType === 'fertilizer') {
		totalCost = quantity * 15;
	} else if (itemType === 'water') {
		totalCost = quantity * 10;
	}

	// Check if the user has enough coins
	if (totalCost <= coins) {
		// Update the coin count
		coins -= totalCost;
		updateModal();

		// Perform the purchase action here (e.g., update inventory)

		// Reset the quantity input field
		if (itemType === 'fertilizer') {
			document.getElementById('fertilize-quantity').value = 0;
			fertilizationsLeft+=quantity;
			updateFertilizerCount();
		} else if (itemType === 'water') {
			document.getElementById('water-quantity').value = 0;
			wateringsLeft+=quantity;
			updateWaterCount();
		}

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
	purchaseItem('fertilizer');
	purchaseItem('water');
	document.getElementById("buyingAudio").play();
});

// Event listeners for decrease and increase buttons
document.getElementById('fertilize-decrease').addEventListener('click', function() {
  var quantityInput = document.getElementById('fertilize-quantity');
  if (parseInt(quantityInput.value) >= 10) {
	quantityInput.value = parseInt(quantityInput.value / 10);
  }
});

document.getElementById('fertilize-increase').addEventListener('click', function() {
  var quantityInput = document.getElementById('fertilize-quantity');
  if(parseInt(quantityInput.value) < 1000000000){
	quantityInput.value = parseInt(quantityInput.value) * 10;
  }
});

document.getElementById('water-decrease').addEventListener('click', function() {
  var quantityInput = document.getElementById('water-quantity');
  if (parseInt(quantityInput.value) >= 10) {
	quantityInput.value = parseInt(quantityInput.value / 10);
  }
});

document.getElementById('water-increase').addEventListener('click', function() {
  var quantityInput = document.getElementById('water-quantity');
  if(parseInt(quantityInput.value) < 1000000000){
	quantityInput.value = parseInt(quantityInput.value) * 10;
  }
});


