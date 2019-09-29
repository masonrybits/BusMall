'use strict';

// globals
Product.allProducts = [];
var productImagesTag = document.getElementById('productImages');
var productLeft = document.getElementById('productLeft');
var productMiddle = document.getElementById('productMiddle');
var productRight = document.getElementById('productRight');
var message = document.getElementById('message');
var productVote = 0;
var rounds = 25;
var lastViewed = [];

// null is nothing
var leftProductIndex = null;
var middleProductIndex = null;
var rightProductIndex = null;

// chart variables
var names = [];
var votes = [];

// constructor function of product
function Product(name, image, clicked = 0, views = 0) {
  this.name = name;
  this.image = image;
  this.clicked = clicked;
  this.views = views;
  Product.allProducts.push(this);
}

// random function
function randomProduct() {
  var randomNumber = Math.floor(Math.random() * Product.allProducts.length);
  return randomNumber;
}

// render function
function renderProduct() {

  // Confirm they are not the same.
  do {
    // give us random product images
    leftProductIndex = randomProduct();
    middleProductIndex = randomProduct();
    rightProductIndex = randomProduct();
    // keep running if there are duplicates for this round, or duplicates from previous round
  } while (lastViewed.includes(leftProductIndex) || lastViewed.includes(middleProductIndex) || lastViewed.includes(rightProductIndex) || leftProductIndex === middleProductIndex || leftProductIndex === rightProductIndex || middleProductIndex === rightProductIndex);

  // Add one to the views of the object
  Product.allProducts[leftProductIndex].views++;
  Product.allProducts[middleProductIndex].views++;
  Product.allProducts[rightProductIndex].views++;

  // set the source of the image tags to the specific array of our products
  productLeft.src = Product.allProducts[leftProductIndex].image;
  productMiddle.src = Product.allProducts[middleProductIndex].image;
  productRight.src = Product.allProducts[rightProductIndex].image;

  lastViewed[0] = leftProductIndex;
  lastViewed[1] = middleProductIndex;
  lastViewed[2] = rightProductIndex;
}

function handleClick(event) {
  event.preventDefault();
  var productClicked = event.target.id;
  if (productClicked === 'productLeft' || productClicked === 'productMiddle' || productClicked === 'productRight') {
    productVote++;
  } if (productClicked === 'productLeft') {
    Product.allProducts[leftProductIndex].clicked++;
  } else if (productClicked === 'productMiddle') {
    Product.allProducts[middleProductIndex].clicked++;
  } else if (productClicked === 'productRight') {
    Product.allProducts[rightProductIndex].clicked++;
  } else {
    alert('You didn\'t select an image');
  }

  if (productVote === rounds) {
    // remove eventlistener
    productImagesTag.removeEventListener('click', handleClick);
    // clear the message
    // message.textContent = '';
    // add new li elements to populate messages
    for (var i = 0; i < Product.allProducts.length; i++) {
      var product = Product.allProducts[i];
      var newLi = document.createElement('li');
      newLi.textContent = `${product.name} had ${product.clicked} votes and was seen ${product.views} times`;
      message.appendChild(newLi);
    }
    updateStorage();
    chart();
  } else {
    renderProduct();
  }
}

// to save the products into local storage
function updateStorage() {
  // convert our array of objects into a JSON string
  var jsonString = JSON.stringify(Product.allProducts);
  // add our converted array onto local storage
  localStorage.setItem('product', jsonString);
}

// create a function that GETS the data from local storage
// sets our global array to the data from local storage
function getProducts() {
  // retrieve the data from local storage
  var data = localStorage.getItem('product');
  // if nothing in storage
  if (localStorage.getItem('product') === null) {
    console.log('Not found');
  } else {
    //if storage, convert stored data back to Objects
    var parsedData = JSON.parse(data);
    // set the global Product.allProducts array to the data we retrieved from local storage
    Product.allProducts = parsedData;
  }
}

// function getProductsAlternative() {
//   var data = localStorage.getItem('product');
//   if (localStorage.getItem('product') === null) {
//     console.log('Not found');
//     new Product('Bag', 'img/bag.jpg');
//     new Product('Banana Slicer', 'img/banana.jpg');
//     new Product('Bathroom Stand', 'img/bathroom.jpg');
//     new Product('Boots', 'img/boots.jpg');
//     new Product('Breakfast Oven', 'img/breakfast.jpg');
//     new Product('Meatball Bubblegum', 'img/bubblegum.jpg');
//     new Product('Chair', 'img/chair.jpg');
//     new Product('Cthulhu', 'img/cthulhu.jpg');
//     new Product('Dog Duck', 'img/dog-duck.jpg');
//     new Product('Dragon Meat', 'img/dragon.jpg');
//     new Product('Pen', 'img/pen.jpg');
//     new Product('Pet Sweep', 'img/pet-sweep.jpg');
//     new Product('Scissors', 'img/scissors.jpg');
//     new Product('Shark', 'img/shark.jpg');
//     new Product('Sweep', 'img/sweep.png');
//     new Product('Tauntaun', 'img/tauntaun.jpg');
//     new Product('Unicorn Meat', 'img/unicorn.jpg');
//     new Product('USB', 'img/usb.gif');
//     new Product('Watering Can', 'img/water-can.jpg');
//     new Product('Wine Glass', 'img/wine-glass.jpg');
//   } else {
//     var parsedData = JSON.parse(data);
//     // parsed data is our JS object array
//     for (var i = 0; i < parsedData.length; i++) {
//       new Product(parsedData[i].name, parsedData[i].image, parsedData[i].clicked, parsedData[i].views);
//       Product.allProducts = parsedData;

//     }
//   }

// chart
// function to update name & clicked in 2 seperate arrays
function getChartArrays() {
  for (var i = 0; i < Product.allProducts.length; i++) {
    names[i] = Product.allProducts[i].name;
    votes[i] = Product.allProducts[i].clicked;
  }
}

// bar chart with given variables names(x-axis) and votes(y-axi)
function chart() {
  getChartArrays();
  var ctx = document.getElementById('chart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(210, 99, 132, 1)',
          'rgba(215, 99, 132, 1)',
          'rgba(220, 99, 132, 1)',
          'rgba(225, 99, 132, 1)',
          'rgba(235, 99, 132, 1)',
          'rgba(245, 99, 132, 1)',
          'rgba(250, 99, 132, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(260, 99, 132, 1)',
          'rgba(265, 99, 132, 1)',
          'rgba(270, 99, 132, 1)',
          'rgba(275, 99, 132, 1)',
          'rgba(280, 99, 132, 1)',
          'rgba(285, 99, 132, 1)',
          'rgba(290, 99, 132, 1)',
          'rgba(295, 99, 132, 1)',
          'rgba(300, 99, 132, 1)',
          'rgba(305, 99, 132, 1)',
          'rgba(310, 99, 132, 1)',
          'rgba(315, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//Make new Products instantiation
new Product('Bag', 'img/bag.jpg');
new Product('Banana Slicer', 'img/banana.jpg');
new Product('Bathroom Stand', 'img/bathroom.jpg');
new Product('Boots', 'img/boots.jpg');
new Product('Breakfast Oven', 'img/breakfast.jpg');
new Product('Meatball Bubblegum', 'img/bubblegum.jpg');
new Product('Chair', 'img/chair.jpg');
new Product('Cthulhu', 'img/cthulhu.jpg');
new Product('Dog Duck', 'img/dog-duck.jpg');
new Product('Dragon Meat', 'img/dragon.jpg');
new Product('Pen', 'img/pen.jpg');
new Product('Pet Sweep', 'img/pet-sweep.jpg');
new Product('Scissors', 'img/scissors.jpg');
new Product('Shark', 'img/shark.jpg');
new Product('Sweep', 'img/sweep.png');
new Product('Tauntaun', 'img/tauntaun.jpg');
new Product('Unicorn Meat', 'img/unicorn.jpg');
new Product('USB', 'img/usb.gif');
new Product('Watering Can', 'img/water-can.jpg');
new Product('Wine Glass', 'img/wine-glass.jpg');

// add event listener
productImagesTag.addEventListener('click', handleClick);

renderProduct();
getProducts();
