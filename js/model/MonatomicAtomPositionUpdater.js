// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class updates the positions of atoms in a monatomic data set (i.e.
 * where each molecule is just a single atom).
 *
 * @author John Blanco
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  /**
   * @param {MoleculeForceAndMotionDataSet} moleculeDataSet
   * @constructor
   */
  function MonatomicAtomPositionUpdater( moleculeDataSet ) {
    // Make sure this is not being used on an inappropriate data set.
    assert && assert( moleculeDataSet.atomsPerMolecule === 1 );

    // Get direct references to the data in the data set.
    var atomPositions = moleculeDataSet.atomPositions;
    var moleculeCenterOfMassPositions = moleculeDataSet.moleculeCenterOfMassPositions;

    // Position the atoms to match the position of the molecules.
    for ( var i = 0; i < moleculeDataSet.numberOfMolecules; i++ ) {
      atomPositions[i].setXY( moleculeCenterOfMassPositions[i] );
    }
  }

  return MonatomicAtomPositionUpdater;
} );
