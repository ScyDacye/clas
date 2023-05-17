const products = [
    {
      name: "twix",
      price: 1000,
      description: "Twix",
      type: "chocolate",
      image:
        "https://m.media-amazon.com/images/I/61fmv+Y0ElL.jpg",
    },
    {
      name: "candy cane",
      price: 1200,
      description: "Candy",
      type: "gummy",
      image:
        "https://m.media-amazon.com/images/I/710Z2IL0diL._AC_SL1276_.jpg",
    },
    {
      name: "skittles",
      price: 2300,
      description: "Candy",
      type: "chocolate",
      image:
        "https://aldprdproductimages.azureedge.net/media/resized/$Aldi_GB/02.08.22/4009900482967_0_XL.jpg",
    },
    {
      name: "m&m",
      price: 550,
      description: "Candy",
      type: "gummy",
      image:
        "https://i5.walmartimages.com/asr/02288908-3b2c-4641-b352-10b5b6d967ca.fd5567dc656086f14c36076382116642.jpeg",
    },
    {
      name: "gummy bear",
      price: 3200,
      description: "Candy",
      type: "chocolate",
      image:
        "https://m.media-amazon.com/images/I/51aat1L8yQL._SX466_.jpg",
    },
  ];
  
  function PrintProducts() {
    const productsContainer = document.getElementById("products");
    let newDiv = "";
  
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
  
      console.log('${product.name} - ${product.price}');
  
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img class='productImage' src="${product.image}"
        <h3 class="title">${product.name}</h3>
        <p>${product.description}</p>
        <p id="price">${product.price}</p>
        <button onclick="AddItem('${product.name}')">add</button>
        <button onclick="MinusItem('${product.name}')">minus</button>
      `;
  
      newDiv += div.outerHTML;
    }
  
    productsContainer.innerHTML = newDiv;
  }
  
  window.onload = PrintProducts;
  
  const userbasket = [];
  
  function AddItem(itemName) {
    const itemIndex = userbasket.findIndex((item) => item.name === itemName);
  
    if (itemIndex !== -1) {
      userbasket[itemIndex].quantity += 1;
    } else {
      userbasket.push({ name: itemName, quantity: 1 });
    }
  
    Basket();
  }
  
  function MinusItem(itemName) {
    const itemIndex = userbasket.findIndex((item) => item.name === itemName);
  
    if (itemIndex !== -1) {
      userbasket[itemIndex].quantity -= 1;
  
      if (userbasket[itemIndex].quantity === 0) {
        userbasket.splice(itemIndex, 1);
      }
    }
  
    Basket();
  }
  
  function Purchase() {
    let total = 0;
    for (let i = 0; i < userbasket.length; i++) {
      const { name, quantity } = userbasket[i];
      const product = products.find((p) => p.name === name);
      if (product) {
        total += product.price * quantity;
      }
    }
  
    document.getElementById("total").innerHTML = total;
    Clear();
  }
  
  function Clear() {
    userbasket = [];
  }
  
  function Basket() {
    const basketDiv = document.getElementById("basket");
    const basketHtml = userbasket
      .map(
        ({ name, quantity }) => `
      <h1>${name} - ${quantity}</h1>
    `
      )
      .join("");
    basketDiv.innerHTML = basketHtml;
  }