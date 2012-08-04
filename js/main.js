/*
 * File:      main.js - Main Script for enlargeyourpassword.com
 *
 * Author:    Eric Bréchemier <github@eric.brechemier.name>
 * License:   Creative Commons Attribution 3.0 Unported
 *            http://creativecommons.org/licenses/by/3.0/
 * Version:   2012-08-04
 */
/*jslint nomen:false, white:false, onevar:false, plusplus:false */
/*global scope, document, window, hex_md5, hex_sha1, hex_sha256, hex_sha512 */
scope(function(context) {
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
      // number, one second in milliseconds
      SECONDS_IN_MS = 1000,
      // number, one minute in milliseconds
      MINUTES_IN_MS = 60 * SECONDS_IN_MS,
      // number, duration in milliseconds before resetting inputs when the
      // window is in the background (blurred)
      TIMEOUT_DELAY_MS = 2.5 * MINUTES_IN_MS;

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
    // Get an array of values of all collected inputs.
    return map(inputs,function(input){
      return input.value;
    });
  }

  function reset(){
    // Reset the page to its default state

    // empty all collected inputs
    foreach(inputs,function(input){
      input.value = '';
    });
    // restore button to its default display
    $('generate').style.display = '';
    // empty generated passwords
    $('crc32As6Digits').innerHTML = '';
    $('crc32AsHexAndCrc8AsHex').innerHTML = '';
    $('md5AsAscii85').innerHTML = '';
    $('md5AsHex').innerHTML = '';
    $('sha1AsHex').innerHTML = '';
    $('sha256AsHex').innerHTML = '';
    $('sha512AsHex').innerHTML = '';
  }

  function escapeHtmlText(text){
    // Escape < and & which may be interpreted as markup in HTML text
    //
    // parameter:
    //   text - string, text which may contain < and &
    //
    // returns:
    //   string, the same text with
    //     '<' replaced with &lt; and
    //     '&' replaced with &amp;

    var
      escaped = {
        '<': '&lt;',
        '&': '&amp;'
      };

    return text.replace(/[<&]/g,function(match){
      return escaped[match];
    });
  }

  function generatePasswords(values){
    // Generate passwords and assign to corresponding elements in display.
    //
    // parameter:
    //   values - array, a list of string values to be concatenated
    //            using ';' as separator.

    var
      concatStory = values.join(';'),
      crc32 = Crc32Str(concatStory),
      crc8AsHex = Hex8(Crc8Str(concatStory)).slice(2).toLowerCase(),
      crc32AsHex = Hex32(crc32).slice(2).toLowerCase(),
      md5AsRawString = rstr_md5(str2rstr_utf8(concatStory)),
      md5AsHex = rstr2hex(md5AsRawString),
      md5BytesArray = map(md5AsRawString, function(c){
        return c.charCodeAt(0);
      }),
      md5AsAscii85 = ascii85.encode(md5BytesArray);

    $('crc32As6Digits').innerHTML = String(crc32).slice(-6);
    $('crc32AsHexAndCrc8AsHex').innerHTML = crc32AsHex+crc8AsHex;
    $('md5AsAscii85').innerHTML = escapeHtmlText(md5AsAscii85);
    $('md5AsHex').innerHTML = md5AsHex;
    $('sha1AsHex').innerHTML = sha1(concatStory);
    $('sha256AsHex').innerHTML = sha256(concatStory);
    $('sha512AsHex').innerHTML = sha512(concatStory);
  }

  function onStoryChange(){
    // Callback for any change of value in an input of the story.

    var values = getInputValues();

    if ( values.join('') === '' ){
      // all empty
      reset();
      return;
    }

    $('generate').style.display = 'none';
    generatePasswords(values);
  }

  // Init
  collectInputs( $('story') );

  // ensure that inputs are empty in tab restored from history
  window.onload = reset;
  window.onunload = reset; // Note: this one has no effect in Firefox, when a
                           // tab is restored from history, it still has values

  // reset after TIMEOUT_DELAY_MS in the background (window loses focus)
  window.onblur = function(){
    resetTimeout = setTimeout(function(){
      reset();
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

});
