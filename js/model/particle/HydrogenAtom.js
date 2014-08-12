// Copyright 2002-2013, University of Colorado Boulder

/**
 * The class represents a single atom of hydrogen in the model.
 *
 * @author John Blanco
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var StatesOfMatterAtom = require( 'STATES_OF_MATTER_BASICS/model/particle/StatesOfMatterAtom' );
  var AtomType = require( 'STATES_OF_MATTER_BASICS/model/AtomType' );

  // constants
  var RADIUS = 120;   // In picometers.
  var MASS = 1.00794; // In atomic mass units.
  var ATOM_TYPE = AtomType.HYDROGEN;

  /**
   * @param {Number} x
   * @param {Number} y
   * @constructor
   */
  function HydrogenAtom( x, y ) {
    StatesOfMatterAtom.call( this, x, y, RADIUS, MASS );
  }

  return inherit( StatesOfMatterAtom, HydrogenAtom, {

    getType: function() {
      return ATOM_TYPE;
    }

  },

  // public static final
  {
    RADIUS: RADIUS,
  } );
} );
