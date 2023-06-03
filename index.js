import { menuArray } from "/data.js";

const orderObjectsArray = []; // array to hold selected menu items
const cardDetailsForm = document.getElementById("modal");

renderItems();

//handle form submit
cardDetailsForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(cardDetailsForm);
  const name = formData.get("name");

  document.getElementById("order-completed").innerHTML = `
            <p>Thanks, ${name}! Your order is on the way!</p>
    `;
  document.getElementById("order-completed").style.display = "flex";
  document.getElementById("modal").style.display = "none";
  document.getElementById("order-box").style.display = "none";
  const orderObjectsArray = [];
});

// event listener for all clicks on the site
document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    handleRemoveClick(e.target.dataset.remove);
  } else if (e.target.id === "btn") {
    handleButtonClick();
  } else if (e.target.dataset.backdrop !== "true") {
    document.getElementById("modal").style.display = "none";
  }
});

function handleAddClick(value) {
  document.getElementById("order-completed").style.display = "none";
  const addedItemObj = menuArray.filter(function (item) {
    return item.id === Number(value);
  })[0]; // store the clicked item object using the id value retrived from the + button

  if (orderObjectsArray.includes(addedItemObj)) {
    // increment the quantity and price of the selected item object if it is already in the ordered items array
    addedItemObj.quantity++;
    addedItemObj.price += addedItemObj.price;
  } else {
    // store the item in the ordered items array if it is not already there
    orderObjectsArray.push(addedItemObj);
  }

  renderOrder(); // call function to render the items in the ordered items array
}

function handleRemoveClick(value) {
  // iterate over the order items array and remove the one whose id is the same as the value
  for (let i = 0; i < orderObjectsArray.length; i++) {
    if (orderObjectsArray[i].id === Number(value)) {
      orderObjectsArray.splice(orderObjectsArray[i], 1);
    }
  }
  renderOrder();
}

function handleButtonClick() {
  //display the payment modal once the user clicks on the complete order button
  document.getElementById("modal").style.display = "flex";
}

function renderOrder() {
  let orderHtml = "";
  let totalPrice = 0;

  if (orderObjectsArray.length > 0) {
    // show the order section when the customer adds at leat one item
    document.getElementById("order-box").style.display = "flex";

    //loop over the order objects array and create html for the entire order
    for (let i = 0; i < orderObjectsArray.length; i++) {
      orderHtml += `
                    <div class="order-box-item">
                        <h1>${orderObjectsArray[i].name}
                            <span class="quantity">x ${
                              orderObjectsArray[i].quantity + 1
                            }</span></h1>
                        <p class="remove" data-remove="${
                          orderObjectsArray[i].id
                        }">remove</p>
                        <h1 class="order-box-item-price">$${
                          orderObjectsArray[i].price
                        }</h1>
                    </div>
            `;

      //
      totalPrice += orderObjectsArray[i].price;
    }
    document.getElementById("order-box-item-list").innerHTML = orderHtml;
    document.getElementById(
      "order-box-total-price"
    ).innerText = `$${totalPrice}`;
  } else {
    // if the array holding the order is empty, hide the order section
    document.getElementById("order-box").style.display = "none";
  }
}

function renderItems() {
  //iterate through the menu array and render the menu items
  let itemsHtml = "";

  for (let item of menuArray) {
    itemsHtml += `
         <div class="item">
                <span class="emoji">${item.emoji}</span>
                <div>
                    <h2>${item.name}</h2>
                    <p class="ingredients">${item.ingredients}</p>
                    <h3>$${item.price}</h3>
                </div>
                <span class="item-add" data-add='${item.id}'>+</span>
            </div>
        `;
  }
  document.getElementById("menu-items-list").innerHTML = itemsHtml;
}
