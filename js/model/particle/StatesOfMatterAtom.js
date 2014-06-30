// Copyright 2002-2013, University of Colorado Boulder

/**
 * Model of a photon for single bulb screen.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} radius
   * @param {Number} mass
   # @constructor
   */
  function StatesOfMatterAtom( x, y, radius, mass ) {
    this.position = new Vector2( x, y );
    this.velocity = new Vector2( 0, 0 );
    this.accel = new Vector2( 0, 0 );

    this.mass = mass;
    this.radius = radius;
  }

  return inherit( Object, StatesOfMatterAtom, {

    equals: function( other ) {
        if ( this === other ) {
            return true;
        }
        // if model is instance of subclass
        // if ( other === null || !(other instanceof this ) {
        //     return false;
        // }

        if ( this.mass !== other.mass ) {
            return false;
        }
        if ( this.radius !== other.radius ) {
            return false;
        }
        if ( !this.velocity.equals( other.velocity ) ) {
            return false;
        }
        if ( !this.position.equals( other.position ) ) {
            return false;
        }
        if ( !this.accel.equals( other.accel ) ) {
            return false;
        }

        return true;
    },

    clone: function() {},

    toString: function() {
        // return getClass().getName() + "[x=" + getX() + ",y=" + getY() + ",radius=" + m_radius + ",mass=" + m_mass + ",vx=" + getVx() + ",vy=" + getVy() + ",ax=" + getAx() + ",ay=" + getAy() + "]";
    },

  } );
} );
