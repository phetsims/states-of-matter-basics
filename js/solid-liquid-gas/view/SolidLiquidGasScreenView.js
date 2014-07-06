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
  var StatesOfMatterConstants = require( 'STATES_OF_MATTER_BASICS/StatesOfMatterConstants' );
  var ParticleContainerNode = require( 'STATES_OF_MATTER_BASICS/view/ParticleContainerNode' );
  var Property = require( 'AXON/Property' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var Panel = require( 'SUN/Panel' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {MultipleParticleModel} model
   * @constructor
   */
  function SolidLiquidGasScreenView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );

    var modelContainmentAreaWidth = StatesOfMatterConstants.CONTAINER_BOUNDS.width;
    var modelContainmentAreaHeight = StatesOfMatterConstants.CONTAINER_BOUNDS.height;
    var mvtScale = StatesOfMatterConstants.VIEW_CONTAINER_WIDTH / StatesOfMatterConstants.CONTAINER_BOUNDS.width;

    // model-view transform
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping( new Vector2( 0, 0 ), new Vector2( 0, StatesOfMatterConstants.VIEW_CONTAINER_HEIGHT ), mvtScale );

    this.addChild( new ParticleContainerNode( model, modelViewTransform,
      {
        centerX: this.layoutBounds.centerX,
        centerY: this.layoutBounds.centerY
      } ) );

    var temperatureProperty = new Property( 50 );
    var sliderValueProperty = new Property( 50 );
    this.addChild( new HeatCoolSlider( temperatureProperty, sliderValueProperty, { centerX: this.layoutBounds.centerX, bottom: this.layoutBounds.bottom } ) );

    var solidButton = new TextPushButton( 'Solid', { listener: function() { model.setPhase( model.PHASE_SOLID ); } } );
    var liquidButton = new TextPushButton( 'Liquid', { listener: function() { model.setPhase( model.PHASE_LIQUID ); } } );
    var gasButton = new TextPushButton( 'Gas', { listener: function() { model.setPhase( model.PHASE_GAS ); } } );

    this.addChild( new Panel( new VBox( { children: [ solidButton, liquidButton, gasButton ] } ) ) );
  }

  return inherit( ScreenView, SolidLiquidGasScreenView,
    {
      step: function( dt ) {
        // step
      }
    } );
} );
