// Copyright 2002-2013, University of Colorado Boulder

/**
 * Replacement for Java's Random.nextGaussian()
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  function randomGaussian() {
    // use uniforn random for now
    // TODO: add correct logic here
    return Math.random();
  }

  return randomGaussian;
} );