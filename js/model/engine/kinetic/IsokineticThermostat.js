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
  var randomGaussian = require( 'STATES_OF_MATTER_BASICS/model/randomGaussian' );
  var StatesOfMatterConstants = require( 'STATES_OF_MATTER_BASICS/StatesOfMatterConstants' );

  /**
   * Constructor for the Isokinetic thermostat.
   * @param {MoleculeForceAndMotionDataSet} moleculeDataSet Data set on which operations will be performed.
   * @param {Number} minTemperature The temperature that should be considered considered absolute zero,
   *                                below which motion should cease.
   * @constructor
   */
  function IsokineticThermostat( moleculeDataSet, minTemperature ) {
    this.moleculeDataSet = moleculeDataSet;
    this.targetTemperature = StatesOfMatterConstants.INITIAL_TEMPERATURE;
    this.minModelTemperature = minTemperature;

    this.moleculeVelocities = moleculeDataSet.moleculeVelocities;
    this.moleculeRotationRates = moleculeDataSet.moleculeRotationRates;
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

      var massInverse = 1 / this.moleculeDataSet.moleculeMass;
      var inertiaInverse = 1 / this.moleculeDataSet.moleculeRotationalInertia;
      var velocityScalingFactor = Math.sqrt( temperature * massInverse * ( 1 - Math.pow( gammaX, 2 ) ) );
      var rotationScalingFactor = Math.sqrt( temperature * inertiaInverse * ( 1 - Math.pow( gammaX, 2 ) ) );

      for ( var i = 0; i < this.moleculeDataSet.getNumberOfMolecules(); i++ ) {
        var xVel = this.moleculeVelocities[i].x * gammaX + randomGaussian() * velocityScalingFactor;
        var yVel = this.moleculeVelocities[i].y * gammaY + randomGaussian() * velocityScalingFactor;
        this.moleculeVelocities[i].setXY( xVel, yVel );
        this.moleculeRotationRates[i] = gammaX * this.moleculeRotationRates[i] + randomGaussian() * rotationScalingFactor;
      }
    }

  } );
} );
