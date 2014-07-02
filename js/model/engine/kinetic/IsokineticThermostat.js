// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class implements a thermostat that adjusts the velocity of all
 * molecules in the system by the same amount in order to get the overall
 * system temperature to the desired set point.
 *
 * @author John Blanco
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );

  function nextGaussian() {
    // TODO
    return 0;
  }

  /**
   * Constructor for the Isokinetic thermostat.
   * @param {MoleculeForceAndMotionDataSet} moleculeDataSet Data set on which operations will be performed.
   * @param {Number} minTemperature The temperature that should be considered considered absolute zero,
   *                                below which motion should cease.
   * @constructor
   */
  function IsokineticThermostat( moleculeDataSet, minTemperature ) {
    this.moleculeDataSet = moleculeDataSet;
    this.targetTemperature = MultipleParticleModel.INITIAL_TEMPERATURE;
    this.minModelTemperature = minTemperature;

    this.moleculeVelocities = moleculeDataSet.getMoleculeVelocities();
    this.moleculeRotationRates = moleculeDataSet.getMoleculeRotationRates();
  }

  return inherit( Object, IsokineticThermostat, {

    adjustTemperature: function() {
      var gammaX = 0.9999;
      var gammaY = gammaX;
      var temperature = this.targetTemperature;

      if ( temperature <= this.minModelTemperature ) {
          // Use a values that will cause the molecules to stop
          // moving if we are below the minimum temperature, since
          // we want to create the appearance of absolute zero.
          gammaX = 0.992;
          gammaY = 0.999;   // Scale a little differently in Y direction so particles don't
          // stop falling when absolute zero is reached.
          temperature = 0;
      }

      var massInverse = 1 / this.moleculeDataSet.getMoleculeMass();
      var inertiaInverse = 1 / this.moleculeDataSet.getMoleculeRotationalInertia();
      var velocityScalingFactor = Math.sqrt( temperature * massInverse * ( 1 - Math.pow( gammaX, 2 ) ) );
      var rotationScalingFactor = Math.sqrt( temperature * inertiaInverse * ( 1 - Math.pow( gammaX, 2 ) ) );

      for ( var i = 0; i < this.moleculeDataSet.getNumberOfMolecules(); i++ ) {
          var xVel = m_moleculeVelocities[i].getX() * gammaX + nextGaussian() * velocityScalingFactor;
          var yVel = m_moleculeVelocities[i].getY() * gammaY + nextGaussian() * velocityScalingFactor;
          this.moleculeVelocities[i].setComponents( xVel, yVel );
          this.moleculeRotationRates[i] = gammaX * m_moleculeRotationRates[i] + nextGaussian() * rotationScalingFactor;
      }
    }

  } );
} );
