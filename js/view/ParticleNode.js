// Copyright 2002-2013, University of Colorado Boulder

/**
 * ParticleNode
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );

  /**
   * Main constructor.
   *
   * @param {StatesOfMatterAtom} particle The particle in the model that this node will represent in the view.
   * @param {ModelViewTransform} modelViewTransform The model view transform for transforming particle position.
   * @constructor
   */
  function ParticleNode( particle, modelViewTransform ) {
    assert && assert( particle && modelViewTransform );

    Node.call( this );

    this.particle = particle;
    this.mvt = mvt;

    // Local initialization.
    this.position = new Vector2( 0, 0 );

    // Register for synchronization with model.
    var thisNode = this;
    this.particle.positionProperty.link( function( position ) {
      thisNode.position = modelViewTransform.modelToViewPosition( position );
    } );

    // Set ourself up to listen to this particle.
    // particle.addListener( new StatesOfMatterAtom.Adapter() {
    //     public void positionChanged() {
    //         updatePosition();
    //     }

    //     public void particleRemoved( StatesOfMatterAtom particle ) {
    //         handleParticleRemoved();
    //     }

    //     public void radiusChanged() {
    //         handleParticleRadiusChanged();
    //     }
    // } );

    // Decide of the diameter of the sphere/circle.
    var radius = particle.getRadius() * 2;

    this.circle = new Circle( radius, { fill: 'blue' } );
    this.addChild( this.circle );
  }

  return inherit( Node, ParticleNode );
} );
