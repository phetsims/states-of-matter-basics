// Copyright 2002-2013, University of Colorado Boulder

/**
 * View for the solid-liquid-gas screen
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {SolidLiquidGasModel} model
   * @constructor
   */
  function SolidLiquidGasScreenView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );
  }

  return inherit( ScreenView, SolidLiquidGasScreenView,
    {
      step: function( dt ) {
        // step
      }
    } );
} );
