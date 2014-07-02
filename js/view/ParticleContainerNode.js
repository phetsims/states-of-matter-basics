// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class is the "view" for the particle container.  This is where the
 * information about the nature of the image that is used to depict the
 * container is encapsulated.
 *
 * @author John Blanco
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );



  //----------------------------------------------------------------------------
  // Private Methods
  //----------------------------------------------------------------------------

  /**
   * Handle a notification that the container size has changed.
   */
  var handleContainerSizeChanged = function() {
    // IMPORTANT NOTE: This routine assumes that only the height of the
    // container can change, since this was true when this routine was
    // created and it isn't worth the effort to make it more general.  If
    // this assumption is ever invalidated, this routine will need to be
    // changed.
    var containerHeight = this.model.particleContainerHeight;
    if ( !this.model.isExploded ) {
        if ( this.containerLid.getRotation() != 0 ) {
            this.containerLid.setRotation( 0 );
        }
        this.containerLid.setOffset( ( this.containmentAreaWidth - this.containerLid.getFullBoundsReference().width ) / 2,
                                  this.containmentAreaHeight - containerHeight - ( this.containerLid.getFullBoundsReference().height / 2 ) + LID_POSITION_TWEAK_FACTOR );
    }
    else {
        // Rotate the lid to create the visual appearance of it being
        // blown off the top of the container.
        this.containerLid.rotateAboutPoint( this.rotationAmount, ( this.containmentAreaWidth / 2 ) / this.containerLid.getScale(), 0 );
        var centerPosY = this.containmentAreaHeight - containerHeight - ( this.containerLid.getFullBoundsReference().height / 2 ) + LID_POSITION_TWEAK_FACTOR;
        var currentPosY = this.containerLid.getOffset().getY();
        var newPosX = this.containerLid.getOffset().getX();
        var newPosY;
        if ( currentPosY > centerPosY ) {
            newPosY = centerPosY;
        }
        else {
            newPosY = currentPosY;
        }
        this.containerLid.setOffset( newPosX, newPosY );
    }

    updatePressureGauge();
  }


  /**
   * Main constructor.
   *
   * @param {MultipleParticleModel} model
   * @param {ModelViewTransform} modelViewTransform The model view transform for transforming particle position.
   * @constructor
   */
  function ParticleContainerNode( model, modelViewTransform, volumeControlEnabled, pressureGaugeEnabled ) {

    Node.call( this );

    this.model = model;
    this.modelViewTransform = modelViewTransform;
    this.containmentAreaWidth = StatesOfMatterConstants.CONTAINER_BOUNDS.width;
    this.containmentAreaHeight = StatesOfMatterConstants.CONTAINER_BOUNDS.height;

    this.model.numParticlesProperty.link( function( numParticles ) {
      // particleAdded listener
    } );

    // Position this node so that the origin of the canvas, i.e. position
    // x=0, y=0, is at the lower left corner of the container.
    double xPos = 0;
    double yPos = -this.containmentAreaHeight;
    setOffset( xPos, yPos );
  }

  return inherit( Node, ParticleContainerNode );
} );
