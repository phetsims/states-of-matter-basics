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
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function HeatCoolSlider( model, options ) {

    var heatProperty = new Property( 0 );

    HSlider.call( this, heatProperty, { min: -1, max: 1 },
      {
        endDrag: function() {
          heatProperty.value = 0;
        }
      } );
    this.rotation = -Math.PI / 2;

    this.model = model;
    var thisNode = this;

    heatProperty.link( function( heat ) {
      if ( thisNode.model !== null ) {
        thisNode.model.setHeatingCoolingAmount( heat );
      }
    } );

    this.mutate( options );
  }

  return inherit( HSlider, HeatCoolSlider );
} );
