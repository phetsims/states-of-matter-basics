// Copyright 2002-2013, University of Colorado Boulder

/**
 * This class implements what is known as an Andersen Thermostat for adjusting
 * the kinetic energy in a set of molecules toward a desired setpoint.
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
   * Constructor for the Andersen thermostat.
   * @param {MoleculeForceAndMotionDataSet} moleculeDataSet Data set on which operations will be performed.
   * @param {Number} minTemperature The temperature that should be considered considered absolute zero,
   *                                below which motion should cease.
   * @constructor
   */
  function AndersenThermostat( moleculeDataSet, minTemperature ) {
    this.moleculeDataSet = moleculeDataSet;
    this.targetTemperature = MultipleParticleModel.INITIAL_TEMPERATURE;
    this.minModelTemperature = minTemperature;

    this.moleculeVelocities = moleculeDataSet.getMoleculeVelocities();
    this.moleculeRotationRates = moleculeDataSet.getMoleculeRotationRates();
  }

  return inherit( Object, AndersenThermostat, {

    adjustTemperature: function() {
      // Calculate the internal temperature of the system from the kinetic energy.
      var measuredTemperature, i;
      var numberOfMolecules = this.moleculeDataSet.getNumberOfMolecules();
      if ( this.moleculeDataSet.getAtomsPerMolecule() > 1 ) {
          // Include rotational inertia in the calculation.
          var centersOfMassKineticEnergy = 0;
          var rotationalKineticEnergy = 0;
          for ( i = 0; i < numberOfMolecules; i++ ) {

              centersOfMassKineticEnergy += 0.5 * this.moleculeDataSet.getMoleculeMass() *
                                            ( Math.pow( this.moleculeVelocities[i].getX(), 2 ) + Math.pow( this.moleculeVelocities[i].getY(), 2 ) );
              rotationalKineticEnergy += 0.5 * this.moleculeDataSet.getMoleculeRotationalInertia() *
                                         Math.pow( this.moleculeRotationRates[i], 2 );
          }
          measuredTemperature = ( centersOfMassKineticEnergy + rotationalKineticEnergy ) / numberOfMolecules / 1.5;
      }
      else {
          var centersOfMassKineticEnergy = 0;
          for ( i = 0; i < this.moleculeDataSet.getNumberOfMolecules(); i++ ) {
              // For single-atom molecules, exclude rotational inertia from the calculation.
              centersOfMassKineticEnergy += 0.5 * this.moleculeDataSet.getMoleculeMass() *
                                            ( Math.pow( this.moleculeVelocities[i].getX(), 2 ) + Math.pow( this.moleculeVelocities[i].getY(), 2 ) );
          }
          measuredTemperature = centersOfMassKineticEnergy / numberOfMolecules;
      }

      // Adjust the temperature.
      adjustTemperature( measuredTemperature );
    },

    adjustTemperature2: function( measuredTemperature ) {

      // Calculate the scaling factor that will be used to adjust the temperature.
      var temperatureScaleFactor;
      if ( this.targetTemperature <= this.minModelTemperature ) {
          temperatureScaleFactor = 0;
      }
      else {
          temperatureScaleFactor = Math.sqrt( this.targetTemperature / measuredTemperature );
      }

      // Adjust the temperature by scaling the velocity of each molecule by the appropriate amount.
      for ( var i = 0; i < m_moleculeDataSet.getNumberOfMolecules(); i++ ) {
          this.moleculeVelocities[i].setComponents( this.moleculeVelocities[i].getX() * temperatureScaleFactor,
                                                 this.moleculeVelocities[i].getY() * temperatureScaleFactor );
          this.moleculeRotationRates[i] *= temperatureScaleFactor; // Doesn't hurt anything in the monatomic case.
      }
    }

  } );
} );
