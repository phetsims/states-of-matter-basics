// Copyright 2014-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var GlobalOptionsNode = require( 'STATES_OF_MATTER/common/view/GlobalOptionsNode' );
  var PhaseChangesScreen = require( 'STATES_OF_MATTER/phase-changes/PhaseChangesScreen' );
  var Property = require( 'AXON/Property' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var StatesScreen = require( 'STATES_OF_MATTER/states/StatesScreen' );

  // strings
  var statesOfMatterBasicsTitleString = require( 'string!STATES_OF_MATTER_BASICS/states-of-matter-basics.title' );

  // property that controls projector mode, initial value can be set via a query parameter
  var projectorModeProperty = new Property( phet.chipper.queryParameters.colorProfile === 'projector' );

  var simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily Moore, Noah Podolefsky, Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aaron Davis, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul, Kathy Perkins',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert this simulation to HTML5.'
    },
    optionsNode: new GlobalOptionsNode( projectorModeProperty )
  };

  SimLauncher.launch( function() {
    var sim = new Sim( statesOfMatterBasicsTitleString, [ new StatesScreen( ),
      new PhaseChangesScreen( false ) ], simOptions );
    sim.start();
  } );
} );