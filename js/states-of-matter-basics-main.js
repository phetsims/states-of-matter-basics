//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var SolidLiquidGasScreen = require( 'STATES_OF_MATTER/solid-liquid-gas/SolidLiquidGasScreen' );
  var PhaseChangesScreen = require( 'STATES_OF_MATTER/phase-changes/PhaseChangesScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var GlobalOptionsNode = require( 'ATOMIC_INTERACTIONS/atomic-interactions/view/GlobalOptionsNode' );
  var Property = require( 'AXON/Property' );

  var colorsProperty = new Property( false );

  // strings
  var simTitle = require( 'string!STATES_OF_MATTER_BASICS/states-of-matter-basics.name' );

  var simOptions = {
    credits: {
      // TODO: get correct names
      // leadDesign: 'Bryce Gruneich',
      // softwareDevelopment: 'Aaron Davis, Sam Reid',
      // team: 'Ariel Paul, Kathy Perkins'
      // qualityAssurance: '',
      // graphicArts: '',
      // thanks: ''
    }, optionsNode: new GlobalOptionsNode( colorsProperty )
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, [ new SolidLiquidGasScreen( colorsProperty ),
      new PhaseChangesScreen( false, colorsProperty ) ], simOptions );
    sim.start();
  } );
} );