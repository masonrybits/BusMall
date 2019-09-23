'use strict';

// globals

Product.allProducts = [];
var productImagesTag = document.getElementById('productImages');
var productLeft = document.getElementById('productLeft');
var productMiddle = document.getElementById('productMiddle');
var productRight = document.getElementById('productRight');


// null is nothing. 
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
    // keep running if there are duplicates
  } while (leftProductIndex === middleProductIndex || leftProductIndex === rightProductIndex || middleProductIndex === rightProductIndex);

  // Add one to the views of the object
  Product.allProducts[leftProductIndex].views++;
  Product.allProducts[middleProductIndex].views++;
  Product.allProducts[rightProductIndex].views++;

  // set the source of the image tags to the specific goat of our array
  productLeft.src = Product.allProducts[leftProductIndex].image;
  productMiddle.src = Product.allProducts[middleProductIndex].image;
  productRight.src = Product.allProducts[rightProductIndex].image;
}
renderProduct();