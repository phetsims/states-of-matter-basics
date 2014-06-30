// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class represents the bundle of data that represents the position,
 * motion, and forces acting upon a set of molecules.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * This creates the data set with the capacity to hold the
   * maximum number of atoms/molecules, but does not create the individual
   * data for them.  That must be done explicitly through other calls.
   * @param {Number} atomsPerMolecule
   * @constructor
   */
  function MoleculeForceAndMotionDataSet( atomsPerMolecule ) {

  }

  return inherit( Object, MoleculeForceAndMotionDataSet );
} );
