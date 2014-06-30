// Copyright 2002-2013, University of Colorado Boulder

/**
 * Heat-cool slider
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var HSlider = require( 'SUN/HSlider' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @constructor
   */
  function HeatCoolSlider( temperatureProperty, sliderValueProperty, options ) {
    HSlider.call( this, sliderValueProperty, { min: 0, max: 100 },
      {
        endDrag: function() {
          sliderValueProperty.value = 50;
        }
      } );
    this.rotation = -Math.PI / 2;

    this.mutate( options );
  }

  return inherit( HSlider, HeatCoolSlider );
} );
