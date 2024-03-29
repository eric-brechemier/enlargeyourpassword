/*
 * File:      utils.js - Utility Functions used in enlargeyourpassword.com
 *
 * Author:    Eric Bréchemier <github@eric.brechemier.name>
 * License:   Creative Commons Attribution 4.0 International
 *            http://creativecommons.org/licenses/by/4.0/
 * Version:   2024-03-29
 */
/*global scope */

scope(function(){
  function trim( string ) {
    // Trim given string (remove whitespace on both ends)
    // Returns a copy of the given string with all the whitespace
    // characters found at the start and end of the string removed.
    //
    // Details of the regular expression used below:
    // Replace any substring matching:
    //   ^ the start of the string
    //   \s+ followed with one or several white-space characters
    //   | or
    //   \s+ one or several white-space characters
    //   $ followed with the end of the string
    // with:
    //   an empty string
    return string.replace( /^\s+|\s+$/g, "" );
  }
  return trim;
},[],"trim");

scope(function(){
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
  return foreach;
},[],"foreach");

scope(function(context){
  var
    foreach = context.foreach;
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
  return map;
},["foreach"],"map");

scope(function(){
  function bind(func,thisArg){
    // Create a closure to call given function applied to given thisArg
    return function(){
      return func.apply(thisArg,arguments);
    };
  }
  return bind;
},[],"bind");

scope(function(context){
  var
    document = context.document,
    bind = context.bind;

  function escapeHtml(text){
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

  return {
    get: bind(document.getElementById,document),
    escapeHtml: escapeHtml
  };
},["document","bind"],"dom");
