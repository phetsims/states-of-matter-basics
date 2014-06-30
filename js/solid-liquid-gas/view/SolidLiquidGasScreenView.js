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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HeatCoolSlider = require( 'STATES_OF_MATTER_BASICS/solid-liquid-gas/view/HeatCoolSlider' );
  var Property = require( 'AXON/Property' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var Panel = require( 'SUN/Panel' );

  /**
   * @param {SolidLiquidGasModel} model
   * @constructor
   */
  function SolidLiquidGasScreenView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    this.addChild( new Rectangle( 0, 0, 200, 250,
      {
        lineWidth: 5,
        stroke: 'white',
        centerX: this.layoutBounds.centerX,
        centerY: this.layoutBounds.centerY
      } ) );

    var temperatureProperty = new Property( 50 );
    var sliderValueProperty = new Property( 50 );
    this.addChild( new HeatCoolSlider( temperatureProperty, sliderValueProperty, { centerX: this.layoutBounds.centerX, bottom: this.layoutBounds.bottom } ) );

    var solidButton = new TextPushButton( 'Solid' );
    var liquidButton = new TextPushButton( 'Liquid' );
    var gasButton = new TextPushButton( 'Gas' );

    this.addChild( new Panel( new VBox( { children: [ solidButton, liquidButton, gasButton ] } ) ) );
  }

  return inherit( ScreenView, SolidLiquidGasScreenView,
    {
      step: function( dt ) {
        // step
      }
    } );
} );
