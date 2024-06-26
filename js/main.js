/*
 * File:      main.js - Main Script for enlargeyourpassword.com
 *
 * Author:    Eric Bréchemier <github@eric.brechemier.name>
 * License:   Creative Commons Attribution 4.0 International
 *            http://creativecommons.org/licenses/by/4.0/
 * Version:   2024-03-29
 */

/*global scope */
scope(function(context) {

  var
    // Declare aliases
    crc = context.crc,
    md5 = context.md5,
    sha1 = context.sha1,
    sha256 = context.sha256,
    sha512 = context.sha512,
    ascii85 = context.ascii85,
    trim = context.trim,
    foreach = context.foreach,
    map = context.map,
    dom = context.dom,
    $ = dom.get,
    escapeHtmlText = dom.escapeHtml,
    window = context.window,

  // private fields
    // array of DOM input elements in the story, in document order
    inputs = [],
    // any, timeout to reload the page to clear inputs
    // after TIMEOUT_DELAY_MS spent in the background (window lost focus)
    reloadTimeout = null,

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
      // Trim each collected value without changing the field itself,
      // to allow typing a sentence with space characters between words.
      return trim( input.value );
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

  function generatePasswords(values){
    // Generate passwords and assign to corresponding elements in display.
    //
    // parameter:
    //   values - array, a list of string values to be concatenated
    //            using ';' as separator.

    var
      concatStory = values.join(';'),
      crc32 = crc.crc32(concatStory),
      crc8AsHex = crc.hex8(crc.crc8(concatStory)).slice(2).toLowerCase(),
      crc32AsHex = crc.hex32(crc32).slice(2).toLowerCase(),
      md5AsRawString = md5.asRawString(md5.string.toRawString(concatStory)),
      md5AsHex = md5.rawString.toHex(md5AsRawString),
      md5BytesArray = map(md5AsRawString, function(c){
        return c.charCodeAt(0);
      }),
      md5AsAscii85 = ascii85.encode(md5BytesArray);

    $('crc32As6Digits').innerHTML = String(crc32).slice(-6);
    $('crc32AsHexAndCrc8AsHex').innerHTML = crc32AsHex+crc8AsHex;
    $('md5AsAscii85').innerHTML = escapeHtmlText(md5AsAscii85);
    $('md5AsHex').innerHTML = md5AsHex;
    $('sha1AsHex').innerHTML = sha1.asHex(concatStory);
    $('sha256AsHex').innerHTML = sha256.asHex(concatStory);
    $('sha512AsHex').innerHTML = sha512.asHex(concatStory);
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
  window.onunload = reset; // Note: this one alone has no effect in Firefox,
                           // when a tab is restored from history,
                           // it still has values initially

  // reload after TIMEOUT_DELAY_MS in the background (window loses focus)
  // to clear inputs and prevent unwanted prying, including through
  // undo cache in each input (ctrl+z / cmd+z)
  window.onblur = function(){
    reloadTimeout = setTimeout(function(){
      window.location.reload();
    },TIMEOUT_DELAY_MS);
  };

  // cancel the timeout when window is back to foreground (gains focus)
  window.onfocus = function(){
    clearTimeout(reloadTimeout);
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

},
[
  "window","dom","trim","foreach","map",
  "crc","md5","crc","md5","sha1","sha256","sha512","ascii85"
]);
