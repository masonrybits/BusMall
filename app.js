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


// constructor function of product
function Product(name, image) {
  this.name = name;
  this.image = image;
  this.clicked = 0;
  this.views = 0;
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
  // event.preventDefault();
  var productClicked = event.target.id;
  if (productClicked === 'productLeft' || productClicked === 'productMiddle' || productClicked === 'productRight') {
    productVote++;
    if (productClicked === 'productLeft') {
      Product.allProducts[leftProductIndex].clicked++;
    } else if (productClicked === 'productMiddle') {
      Product.allProducts[middleProductIndex].clicked++;
    } else if (productClicked === 'productRight') {
      Product.allProducts[rightProductIndex].clicked++;
    }
  } else {
    alert('You didn\'t select an image');
  }

  if (productVote === rounds) {
    // remove eventlistener
    productImagesTag.removeEventListener('click', handleClick);
    // alert('You completed the voting.');
    // add new li elements to populate messages
    for (var i = 0; i < Product.allProducts.length; i++) {
      var product = Product.allProducts[i];
      var newLi = document.createElement('li');
      newLi.textContent = `${product.name} had ${product.clicked} votes and was seen ${product.views} times`;
      message.appendChild(newLi);
    }
  } else {
    renderProduct();
  }
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

