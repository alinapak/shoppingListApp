let shoppingInput = document.getElementById("shopping-input");
let shoppingButton = document.getElementById("shopping-button");
let shoppingList = document.getElementById("shopping-list");

shoppingButton.addEventListener("click", addShoppingInput);
shoppingList.addEventListener("click", deleteOrGet);
document.addEventListener("DOMContentLoaded", readItems);

function addShoppingInput(event) {
    event.preventDefault();
    let list = document.createElement("div");
    list.classList.add("list");
    let newItem = document.createElement("li");
    newItem.innerText = shoppingInput.value;
    if (shoppingInput.value.length !== 0) {
        newItem.classList.add("list-item");
        list.appendChild(newItem);
        saveLocalItems(shoppingInput.value);
        let gotItButton = document.createElement("button");
        gotItButton.innerText = "Got It";
        gotItButton.classList.add("got-it");
        list.appendChild(gotItButton);
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete");
        list.appendChild(deleteButton);
        shoppingList.appendChild(list);
        shoppingInput.value = "";
    }
}

function deleteOrGet(event) {
    let item = event.target;
    if (item.classList[0] === "delete") {
        let shoppingItem = item.parentElement;
        shoppingItem.remove();
    }
    else if (item.classList[0] === "got-it") {
        let shoppingItem = item.parentElement;
        shoppingItem.classList.toggle("in-a-cart");
    }
}
function saveLocalItems(items) {
    let itemList;
    if (localStorage.getItem("itemList") === null) {
        itemList = [];
    } else {
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
    itemList.push(items);
    localStorage.setItem("itemList", JSON.stringify(itemList));
}
function readItems() {
    let itemList;
    if (localStorage.getItem("itemList") === null) {
        itemList = [];
    } else {
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
    itemList.forEach(function (items) {
        let list = document.createElement("div");
        list.classList.add("list");
        let newItem = document.createElement("li");
        newItem.innerText = items;
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
    })
}