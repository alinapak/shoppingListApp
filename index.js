let shoppingInput = document.getElementById("shopping-input");
let shoppingButton = document.getElementById("shopping-button");
let shoppingList = document.getElementById("shopping-list");

shoppingButton.addEventListener("click", addShoppingInput);

function addShoppingInput(event) {
   event.preventDefault();
   let list = document.createElement("div");
   list.classList.add("list");
   let newItem = document.createElement("li");
   newItem.innerText = "saldytu koldunu liutukas" // shopingInput innerText?
   newItem.classList.add("list-item");
   list.appendChild(newItem);
   let gotItButton = document.createElement("button");
   gotItButton.innerText = "Got It";
   gotItButton.classList.add("got-it");
   list.appendChild(gotItButton);
   let deleteButton = document.createElement("button");
   deleteButton.innerText = "Delete";
   deleteButton.classList.add("delete");
   list.appendChild(deleteButton);
   shoppingList.appendChild(list);
}