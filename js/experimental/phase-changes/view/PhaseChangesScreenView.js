// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the phase changes screen
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {PhaseChangesModel} model
   * @constructor
   */
  function PhaseChangesScreenView( model ) {
    ScreenView.call( this, { renderer: 'svg', layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );
  }

  return inherit( ScreenView, PhaseChangesScreenView,
    {
      step: function( dt ) {
        // step
      }
    } );
} );
