let shoppingInput = document.getElementById("shopping-input");
let shoppingButton = document.getElementById("shopping-button");
let shoppingList = document.getElementById("shopping-list");
let div = document.getElementsByClassName("list");

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
        removeLocalItems(shoppingItem);
        shoppingItem.remove();
    }
    else if (item.classList[0] === "got-it") {
        let shoppingItem = item.parentElement;
        shoppingItem.classList.toggle("in-a-cart");
        updateLocalItems(shoppingItem);
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
    }
    )
}

function removeLocalItems(items) {
    let itemList;
    if (localStorage.getItem("itemList") === null) {
        itemList = [];
    } else {
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
    let itemsIndex = items.children[0].innerText;
    itemList.splice(itemList.indexOf(itemsIndex), 1);
    localStorage.setItem("itemList", JSON.stringify(itemList));
}

function updateLocalItems() {
    let itemList;
    if (localStorage.getItem("itemList") === null) {
        itemList = [];
    } else {
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }
    let checked;
    let enable;
    let disable;
    for (let i = 0; i < div.length; i++) {
        checked = div[i];
        if (checked.classList.contains("in-a-cart") === true) {
            enable = "✓" + div[i].children[0].innerText;
            checked.style.opacity = "0.5";
           itemList.splice(itemList.indexOf(div[i].children[0].innerText), 1, enable)
        }
        else if (checked.classList.contains("in-a-cart") === false) {
            disable = div[i].children[0].innerText;
            checked.style.opacity = "1";
            itemList.splice(itemList.indexOf(div[i].children[0].innerText), 1, disable);
        }
    }
    localStorage.setItem("itemList", JSON.stringify(itemList));
}