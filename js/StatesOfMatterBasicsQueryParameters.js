// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var statesOfMatterBasics = require( 'STATES_OF_MATTER_BASICS/statesOfMatterBasics' );

  var StatesOfMatterBasicsQueryParameters = QueryStringMachine.getAll( {

    // fill the shape placement boards on the 'Explore' screen during startup, useful for testing
    projectorMode: { type: 'flag' }
  } );

  statesOfMatterBasics.register( 'StatesOfMatterBasicsQueryParameters', StatesOfMatterBasicsQueryParameters );

  return StatesOfMatterBasicsQueryParameters;
} );
