/*
 * File:      main.js - Main Script for enlargeyourpassword.com
 *
 * Author:    Eric Bréchemier <github@eric.brechemier.name>
 * License:   Creative Commons Attribution 3.0 Unported
 *            http://creativecommons.org/licenses/by/3.0/
 * Version:   2011-04-02
 */
/*jslint nomen:false, white:false, onevar:false, plusplus:false */
/*global document, window, hex_md5, hex_sha1, hex_sha256, hex_sha512 */
(function() {
  // Closure to prive private scope

  // Utility functions

  function bind(func,thisArg){
    // Create a closure to call given function applied to given thisArg
    return function(){
      return func.apply(thisArg,arguments);
    };
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
      md5 = hex_md5,        /*requires js/md5.js */
      sha1 = hex_sha1,      /*requires js/sha1.js */
      sha256 = hex_sha256,  /*requires js/sha256.js */
      sha512 = hex_sha512,  /*requires js/sha512.js */

  // private fields
      // array of DOM input elements in the story, in document order
      inputs = [],
      // any, timeout to reset inputs after TIMEOUT_DELAY_MS in background
      resetTimeout = null,

  // constants
      // number, duration in milliseconds before resetting inputs when the
      // window is in the background (blurred)
      TIMEOUT_DELAY_MS = 150 * 1000;

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

  function emptyInputs(){
    // Empty all collected inputs.
    return map(inputs,function(input){
      input.value = '';
    });
  }

  function getInputValues(){
    // Get an array of values of all collected inputs.
    return map(inputs,function(input){
      return input.value;
    });
  }

  function generatePasswords(){
    // Generate SHA-1, SHA-256 and SHA-512 and assign to corresponding display.
    var concatStory = getInputValues().join(';');
    $('md5').innerHTML = md5(concatStory);
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

  // ensure that inputs are empty in tab restored from history
  window.onload = emptyInputs;
  window.onunload = emptyInputs; // Note: this one has no effect in Firefox,
                                 // the tab is restored with its previous state

  // reset after TIMEOUT_DELAY_MS in the background (window loses focus)
  window.onblur = function(){
    resetTimeout = setTimeout(function(){
      emptyInputs();
    },TIMEOUT_DELAY_MS);
  };

  // cancel the timeout when window is back to foreground (gains focus)
  window.onfocus = function(){
    clearTimeout(resetTimeout);
  };

  // The generate button acts as a "visual proxy" for the generation process.
  // It gets hidden has soon as the story is updated, and is never shown again,
  // even if the story gets back to empty.
  $('generate').onclick = function(){
    window.alert('Please tell your story first!');
  };

  foreach(inputs,function(input){
    input.onkeyup = onStoryChange;
    input.onchange = onStoryChange;
  });

}());
