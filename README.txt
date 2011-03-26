
  Enlarge Your Password!
  http://enlargeyourpassword.com

AUTHOR

  Eric Bréchemier <github@eric.brechemier.name>

DESCRIPTION

  Tired of reusing that same old password all over the web?
  Spice it up and get a real strong password!
  Coming in three sizes: L, XL and our favorite XXL.

LICENSE

  CC-BY Eric Bréchemier
  Creative Commons Attribution 3.0 Unported
  http://creativecommons.org/licenses/by/3.0/

  Includes sha1.js, sha256.js and sha512.js from jshash
  Distributed under the BSD License
  http://pajhome.org.uk/crypt/md5/scripts.html
  * sha1.js
    Version 2.2 Copyright Paul Johnston 2000 - 2009.
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
  * sha256.js
    Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
  * sha512.js
    Version 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009.
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet

LANGUAGES

  HTML, CSS, JavaScript

DESIGN AND ALGORITHM FOR PASSWORD GENERATION

  This is a very simple web app, designed for everyday use. The goal is to
  generate a strong password to access a web site by filling in a form with
  simple yet unique information. All inputs are optional and the password is
  generated on the fly, which lets the user choose the level of details to get
  more or less security. The same password is generated consistently for the
  same inputs.

  The input values are taken as is (including case and punctuation) and
  concatenated in sequential order of the fields as they appear in the form.
  The concatenated values are separated with ';'. There is no separator before
  the first or after the last value, only between values. An empty value in the
  middle of the chain is still included and results in the sequence ';;'.

  Different versions of the SHA algorithm are applied to the string resulting
  from the concatenation to generate passwords of different lengths:

    * SHA-1   generates passwords of  40 characters (size L)
    * SHA-256 generates passwords of  56 characters (size XL)
    * SHA-512 generates passwords of 128 characters (size XXL)

  The family of SHA algorithms was used because:

    * it is a published standard
      (I do not believe in security through obscurity)

    * open-source JavaScript implementations are available
      (e.g. jshash, Stanford JavaScript Crypto Library)

    * it comes in several sizes
      (web sites may reject passwords over a certain length)

    * generated strings contain only alphanumerical characters
      (web sites may reject special characters, symbols and punctuation)

HISTORY

  2011-XX-XX, ROADMAP: first release of http://enlargeyourpassword.com

