// Copyright 2014-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const GlobalOptionsNode = require( 'STATES_OF_MATTER/common/view/GlobalOptionsNode' );
  const PhaseChangesScreen = require( 'STATES_OF_MATTER/phase-changes/PhaseChangesScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const StatesScreen = require( 'STATES_OF_MATTER/states/StatesScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const statesOfMatterBasicsTitleString = require( 'string!STATES_OF_MATTER_BASICS/states-of-matter-basics.title' );

  const simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily B. Moore, Noah Podolefsky,<br>Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aaron Davis, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul, Kathy Perkins,<br>Carl Wieman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Liam Mulhall,<br>' +
                        'Oliver Orejola, Laura Rea, Benjamin Roberts, Jacob Romero, Kathryn Woessner, Bryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert this simulation to HTML5.'
    },

    // create content for the Options dialog
    createOptionsDialogContent: () => new GlobalOptionsNode( Tandem.ROOT.createTandem( 'globalOptionsNode' ) )
  };

  SimLauncher.launch( function() {
    const sim = new Sim( statesOfMatterBasicsTitleString, [
      new StatesScreen( Tandem.ROOT.createTandem( 'statesScreen' ) ),
      new PhaseChangesScreen( false, Tandem.ROOT.createTandem( 'phaseChangesScreen' ) )
    ], simOptions );
    sim.start();
  } );
} );