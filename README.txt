
  Enlarge Your Password!
  http://enlargeyourpassword.com

AUTHOR

  Eric Bréchemier <github@eric.brechemier.name>

DESCRIPTION

  Tired of reusing that same old password all over the web?
  Spice it up and get a real strong password!
  Coming in seven sizes from XXS to our favorite XXL.

LICENSE

  CC-BY Eric Bréchemier
  Creative Commons Attribution 4.0 International
  http://creativecommons.org/licenses/by/4.0/

  Includes Indubitably NF by Nick Curtis, courtesy of Nick's Fonts.
  Web fonts distributed by Font Squirrel:
  http://www.fontsquirrel.com/fonts/Indubitably

  Includes scope-level1-global.js from scope-or-not project
  Distributed under the MIT License
  https://github.com/eric-brechemier/scopeornot
  Developed by Eric Bréchemier

  Includes md5.js, sha1.js, sha256.js and sha512.js from jshash
  Distributed under the BSD License
  http://pajhome.org.uk/crypt/md5/scripts.html
  * md5.js
    Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
  * sha1.js
    Version 2.2 Copyright Paul Johnston 2000 - 2009.
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
  * sha256.js
    Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
  * sha512.js
    Version 2.2 Copyright Anonymous Contributor, Paul Johnston 2000 - 2009.
    Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet

  Includes ascii85.js from DojoX Encoding
  Distributed under the BSD License part of the Dojo ToolKit SDK
  http://dojotoolkit.org/reference-guide/dojox/encoding.html
  http://trac.dojotoolkit.org/browser/dojox/trunk/LICENSE
  * ascii85.js
    Version 0.1.0, 2007-07-30, Copyright (C) the Dojo Foundation
    Authors: Eugene Lazutkin, Tom Trenka

  Includes crc.js from HTML source of JavaScript CRC
  http://www.digsys.se/JavaScript/CRC.aspx
  Developed by Anders Danielsson
    XHTML / JavaScript source code        September 19, 2010
    Copyright (c) 2003-2012 Scandinavian Digital Systems AB
    Internet: http://www.digsys.se
    Freeware: The source code and its methods and algorithms may be
              used as desired without restrictions.

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

  The family of SHA algorithms was chosen because:

    * it is a published standard
      (I do not believe in security through obscurity)

    * open-source JavaScript implementations are available
      (e.g. jshash, Stanford JavaScript Crypto Library)

    * it comes in several sizes
      (web sites may reject passwords over a certain length)

    * generated strings contain only alphanumerical characters
      (web sites may reject special characters, symbols and punctuation)

  I later added MD5 to generate passwords of 32 characters (size M), when
  faced to a sign up page that refused any password longer than 32 characters.

  Similarly, I added ASCII85 encoding of MD5 to get passwords of 20 characters
  (size S) to comply with a sign up page that required to choose a password
  between 5 and 20 characters.

  Finally, I added the size XS to get even shorter passwords for sign up
  pages of two services: the first one limited to 8 to 12 characters with
  some punctuation allowed, the second to 10 characters without punctuation.
  For the size XS, I concatenated the hex values of CRC32 and CRC8.

  I also used CRC32 for the size XXS, to get 6-digit passwords for log in
  widgets used by banks: CRC32 is computed as a signed integer and then
  truncated to the last 6 decimal digits.

HISTORY

  2011-03-26, First release of http://enlargeyourpassword.com (no CSS style)
  2011-04-02, Empty all fields on page load/unload and after 2'30 in background
  2011-04-04, Fixed wording, empty generated passwords as well on reset
  2012-01-23, Added CSS Styles: pink colors, custom font for title
  2012-05-07, Completed support for size S using ASCII85 encoding of MD5
  2012-07-21, Added support for sizes XS and XXS using CRC32 and CRC8
  2012-08-04, Use scope() from scope-or-not project to declare modules
  2012-12-15, Added styles for width of inputs
  2014-05-22, Inherit font styles in inputs
  2015-03-30, Reload page to clear inputs 'undo' cache after 2'30 in background
  2024-03-29, Ignore space characters found at start and end of each input
  XXXX-XX-XX, Use Passwordia font to conceal inputs and passwords by default
  XXXX-XX-XX, Add color hash as visual indicator in stealth mode

