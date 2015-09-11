// Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var StatesScreen = require( 'STATES_OF_MATTER/states/StatesScreen' );
  var PhaseChangesScreen = require( 'STATES_OF_MATTER/phase-changes/PhaseChangesScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var GlobalOptionsNode = require( 'STATES_OF_MATTER/common/view/GlobalOptionsNode' );
  var Property = require( 'AXON/Property' );

  // strings
  var simTitle = require( 'string!STATES_OF_MATTER_BASICS/states-of-matter-basics.title' );

  // property used for switching color options
  var projectorModeProperty = new Property( false );

  var simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Sarah McKagan, Emily Moore, Noah Podolefsky, Amy Rouinfar',
      softwareDevelopment: 'John Blanco',
      team: 'Wendy Adams, Jack Barbera, Kelly Lancaster, Kathy Perkins',
      qualityAssurance: 'Steele Dalton',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team\nto convert this simulation to HTML5.'
    }, optionsNode: new GlobalOptionsNode( projectorModeProperty )
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new StatesScreen( projectorModeProperty ),
      new PhaseChangesScreen( projectorModeProperty, false ) ], simOptions );
    sim.start();
  } );
} );