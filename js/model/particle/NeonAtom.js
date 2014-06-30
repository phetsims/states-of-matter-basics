// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon for single bulb screen.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var StateOfMatterAtom = require( 'STATES_OF_MATTER_BASICS/model/particle/StateOfMatterAtom' );
  var AtomType = require( 'STATES_OF_MATTER_BASICS/model/AtomType' );

  // constants
  var RADIUS = 154;   // In picometers.
  var MASS = 20.1797; // In atomic mass units.
  var EPSILON = 32.8; // epsilon/k-Boltzmann is in Kelvin.
  var ATOM_TYPE = AtomType.NEON;

  /**
   * @param {Number} x
   * @param {Number} y
   # @constructor
   */
  function NeonAtom( x, y ) {
    StateOfMatterAtom.call( this, x, y, RADIUS, MASS );
  }

  return inherit( StateOfMatterAtom, NeonAtom, {

    getType: function() {
      return ATOM_TYPE;
    }

  } );
} );
