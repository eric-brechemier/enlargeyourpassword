/*
 * File:      main.js - Main Script for enlargeyourpassword.com
 *
 * Author:    Eric Bréchemier <github@eric.brechemier.name>
 * License:   Creative Commons Attribution 3.0 Unported
 *            http://creativecommons.org/licenses/by/3.0/
 * Version:   2011-03-26
 */
/*jslint nomen:false, white:false, onevar:false, plusplus:false */
/*global document, window */
(function() {
  // Closure to prive private scope

  // Utility functions

  function bind(func,thisArg){
    // Create a closure to call given function applied to given thisArg
    return function(){
      return func.apply(thisArg,arguments);
    }
  }

  function foreach(array,func){
    // Apply given function to each item in given array in turn.
    // The current item, current index (0-based), and the length of the array
    // are provided as arguments.
    if (!array){
      return;
    }
    var i, length;
    for (i=0, length=array.length; i<length; i++){
      func(array[i],i,length);
    }
  }

  function map(array,func){
    // Map given function to each item in given array.
    // Returns an array of the same length as given array, with each item being
    // the result of the function applied to the item in the same position.

    var results = [];
    foreach(array,function(item){
      results.push( func(item) );
    });
    return results;
  }

  // declare aliases
  var $ = bind(document.getElementById,document),
      sha1 = hex_sha1,      /*requires js/sha1.js */
      sha256 = hex_sha256,  /*requires js/sha256.js */
      sha512 = hex_sha512,  /*requires js/sha512.js */

  // constants
      ELEMENT_NODE = 1,

  // private fields
      // array of DOM input elements in the story, in document order
      inputs = [];

  function collectInputs(node){
    // Collect all input elements, recursively, in given node.
    // Input elements are added to inputs array, in document order.
    if (node===null){
      return;
    }
    if (node.nodeName === 'INPUT'){
      inputs.push(node);
    }
    collectInputs(node.firstChild);
    collectInputs(node.nextSibling);
  }

  function getInputValues(){
    // Get an array of values of all inputs in the story, in document order.
    return map(inputs,function(input){
      return input.value;
    });
  }

  function generatePasswords(){
    // Generate SHA-1, SHA-256 and SHA-512 and assign to corresponding display.
    var concatStory = getInputValues().join(';');
    $('sha1').innerHTML = sha1(concatStory);
    $('sha256').innerHTML = sha256(concatStory);
    $('sha512').innerHTML = sha512(concatStory);
  }

  function onStoryChange(){
    // Callback for any change of value in an input of the story.

    $('generate').style.display = 'none';
    generatePasswords();
  }

  // Init
  collectInputs( $('story') );

  // The generate button acts as a "visual proxy" for the generation process.
  // It gets hidden has soon as the story is updated, and is never shown again,
  // even if the story gets back to empty.
  $('generate').onclick = function(){
    window.alert('Please tell your story first!');
  };

  foreach(inputs,function(input){
    input.onkeydown = onStoryChange;
    input.onchange = onStoryChange;
  });

}());
