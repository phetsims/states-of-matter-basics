// Copyright 2002-2013, University of Colorado Boulder

/**
 * MultipleParticleModel. Ported directly from Java version.
 *
 * @author Aaron Davis
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Rectangle = require( 'DOT/Rectangle' );
  var StatesOfMatterConstants = require( 'STATES_OF_MATTER_BASICS/StatesOfMatterBasicsConstants')

  // statics
  // The internal model temperature values for the various states.
  var SOLID_TEMPERATURE = 0.15;
  var SLUSH_TEMPERATURE = 0.33;
  var LIQUID_TEMPERATURE = 0.34;
  var GAS_TEMPERATURE = 1.0;

  // Constants that control various aspects of the model behavior.
  var DEFAULT_MOLECULE = StatesOfMatterConstants.NEON;
  var INITIAL_TEMPERATURE = SOLID_TEMPERATURE;
  var MAX_TEMPERATURE = 50.0;
  var MIN_TEMPERATURE = 0.0001;
  var INITIAL_GRAVITATIONAL_ACCEL = 0.045;
  var MAX_GRAVITATIONAL_ACCEL = 0.4;
  var MAX_TEMPERATURE_CHANGE_PER_ADJUSTMENT = 0.025;
  var TICKS_PER_TEMP_ADJUSTMENT = 10;
  var MIN_INJECTED_MOLECULE_VELOCITY = 0.5;
  var MAX_INJECTED_MOLECULE_VELOCITY = 2.0;
  var MAX_INJECTED_MOLECULE_ANGLE = Math.PI * 0.8;
  var VERLET_CALCULATIONS_PER_CLOCK_TICK = 8;

  // Constants used for setting the phase directly.
  var PHASE_SOLID = 1;
  var PHASE_LIQUID = 2;
  var PHASE_GAS = 3;
  var INJECTION_POINT_HORIZ_PROPORTION = 0.95;
  var INJECTION_POINT_VERT_PROPORTION = 0.5;

  // Possible thermostat settings.
  var NO_THERMOSTAT = 0;
  var ISOKINETIC_THERMOSTAT = 1;
  var ANDERSEN_THERMOSTAT = 2;
  var ADAPTIVE_THERMOSTAT = 3;

  // Parameters to control rates of change of the container size.
  var MAX_PER_TICK_CONTAINER_SHRINKAGE = 50;
  var MAX_PER_TICK_CONTAINER_EXPANSION = 200;

  // Countdown value used when recalculating temperature when the
  // container size is changing.
  var CONTAINER_SIZE_CHANGE_RESET_COUNT = 25;

  // Range for deciding if the temperature is near the current set point.
  // The units are internal model units.
  var TEMPERATURE_CLOSENESS_RANGE = 0.15;

  // Constant for deciding if a particle should be considered near to the
  // edges of the container.
  var PARTICLE_EDGE_PROXIMITY_RANGE = 2.5;

  // Values used for converting from model temperature to the temperature
  // for a given particle.
  var TRIPLE_POINT_MONATOMIC_MODEL_TEMPERATURE = 0.26;    // Empirically determined.
  var CRITICAL_POINT_MONATOMIC_MODEL_TEMPERATURE = 0.8;  // Empirically determined.
  var NEON_TRIPLE_POINT_IN_KELVIN = 23;   // Tweaked a little from actual value for better temperature mapping.
  var NEON_CRITICAL_POINT_IN_KELVIN = 44;
  var ARGON_TRIPLE_POINT_IN_KELVIN = 75;  // Tweaked a little from actual value for better temperature mapping.
  var ARGON_CRITICAL_POINT_IN_KELVIN = 151;
  var O2_TRIPLE_POINT_IN_KELVIN = 54;
  var O2_CRITICAL_POINT_IN_KELVIN = 155;
  var WATER_TRIPLE_POINT_IN_KELVIN = 273;
  var WATER_CRITICAL_POINT_IN_KELVIN = 647;

  // The following values are used for temperature conversion for the
  // adjustable molecule.  These are somewhat arbitrary, since in the real
  // world the values would change if epsilon were changed.  They have been
  // chosen to be similar to argon, because the default epsilon value is
  // half of the allowable range, and this value ends up being similar to
  // argon.
  var ADJUSTABLE_ATOM_TRIPLE_POINT_IN_KELVIN = 75;
  var ADJUSTABLE_ATOM_CRITICAL_POINT_IN_KELVIN = 140;

  // Min a max values for adjustable epsilon.  Originally there was a wider
  // allowable range, but the simulation did not work so well, so the range
  // below was arrived at empirically and seems to work reasonably well.
  // var MIN_ADJUSTABLE_EPSILON = 1.5 * NeonAtom.EPSILON;
  // var MAX_ADJUSTABLE_EPSILON = StatesOfMatterConstants.EPSILON_FOR_WATER;

  /**
   * @constructor
   */
  function MultipleParticleModel() {

    // private vars
    this.particles = new ObservableArray();
    this.particleContainerHeight;
    this.moleculeDataSet = null; // will be initialized in initializeMonatomic

    // Do just enough initialization to allow the view and control
    // portions of the simulation to be properly created.  The rest of the
    // initialization will occur when the model is reset.
    this.particleDiameter = 1;
    resetContainerSize();
    this.currentMolecule = DEFAULT_MOLECULE;

    PropertySet.call( this, {

      }
    );
  }

  return inherit( PropertySet, MultipleParticleModel, {

    // public methods


    // setters

    getNumMolecules: function() {
        // return this.particles.length / m_moleculeDataSet.getAtomsPerMolecule();
    },

    /**
     * Get a rectangle that represents the current size and position of the particle container.
     */
    getParticleContainerRect: function() {
        // return new Rectangle( 0, 0, StatesOfMatterConstants.PARTICLE_CONTAINER_WIDTH, this.particleContainerHeight );
    },

    /**
     * @param {Number} newTemperature
     */
    setTemperature: function( newTemperature ) {
        // if ( newTemperature > MAX_TEMPERATURE ) {
        //     m_temperatureSetPoint = MAX_TEMPERATURE;
        // }
        // else if ( newTemperature < MIN_TEMPERATURE ) {
        //     m_temperatureSetPoint = MIN_TEMPERATURE;
        // }
        // else {
        //     m_temperatureSetPoint = newTemperature;
        // }

        // if ( m_isoKineticThermostat != null ) {
        //     m_isoKineticThermostat.setTargetTemperature( newTemperature );
        // }

        // if ( m_andersenThermostat != null ) {
        //     m_andersenThermostat.setTargetTemperature( newTemperature );
        // }

        // notifyTemperatureChanged();
    },

    reset: function() {},

    /**
     * Set the phase of the particles in the simulation.
     * @param {Number} state
     */
    setPhase: function( state ) {},

    /**
     * Sets the amount of heating or cooling that the system is undergoing.
     *
     * @param {Number} normalizedHeatingCoolingAmount Normalized amount of heating or cooling
     *                 that the system is undergoing, ranging from -1 to +1.
     */
    setHeatingCoolingAmount: function( normalizedHeatingCoolingAmount ) {},

    /**
     * Inject a new molecule of the current type into the model.  This uses
     * the current temperature to assign an initial velocity.
     */
    injectMolecule: function() {},

    step: function( dt ) {},

     //----------------------------------------------------------------------------
    // Private Methods
    //----------------------------------------------------------------------------

    removeAllParticles: function() {
        this.particles.clear();

        // Get rid of the normalized particles.
        this.moleculeDataSet = null;
    },

    /**
     * Initialize the various model components to handle a simulation in which
     * all the molecules are single atoms.
     *
     * @param {Number} moleculeID
     * @param {Number} phase
     */
    initializeMonatomic: function( moleculeID, phase ) {

        // Verify that a valid molecule ID was provided.
        assert && assert( moleculeID === StatesOfMatterConstants.NEON || moleculeID === StatesOfMatterConstants.ARGON )

        // Determine the number of atoms/molecules to create.  This will be a cube
        // (really a square, since it's 2D, but you get the idea) that takes
        // up a fixed amount of the bottom of the container, so the number of
        // molecules that can fit depends on the size of the individual.
        var particleDiameter;
        if ( moleculeID == StatesOfMatterConstants.NEON ) {
            particleDiameter = NeonAtom.RADIUS * 2;
        }
        else if ( moleculeID == StatesOfMatterConstants.ARGON ) {
            particleDiameter = ArgonAtom.RADIUS * 2;
        }
        else {
            // Force it to neon.
            moleculeID = StatesOfMatterConstants.NEON;
            particleDiameter = NeonAtom.RADIUS * 2;
        }

        // Initialize the number of atoms assuming that the solid form, when
        // made into a square, will consume about 1/3 the width of the container.
        var numberOfAtoms = Math.pow( Math.round( StatesOfMatterConstants.CONTAINER_BOUNDS.width / ( ( particleDiameter * 1.05 ) * 3 ) ), 2 );

        // Create the normalized data set for the one-atom-per-molecule case.
        this.moleculeDataSet = new MoleculeForceAndMotionDataSet( 1 );

        // Create the strategies that will work on this data set.
        // TODO: uncomment when dependencies are added.
        // this.phaseStateChanger = new MonatomicPhaseStateChanger( this );
        // this.atomPositionUpdater = new MonatomicAtomPositionUpdater();
        // this.moleculeForceAndMotionCalculator = new MonatomicVerletAlgorithm( this );
        // this.isoKineticThermostat = new IsokineticThermostat( m_moleculeDataSet, m_minModelTemperature );
        // this.andersenThermostat = new AndersenThermostat( m_moleculeDataSet, m_minModelTemperature );

        // Create the individual atoms and add them to the data set.
        for ( var i = 0; i < numberOfAtoms; i++ ) {

            // Create the atom.
            Point2D moleculeCenterOfMassPosition = new Point2D.Double();
            MutableVector2D moleculeVelocity = new MutableVector2D();
            Point2D[] atomPositions = new Point2D[1];
            atomPositions[0] = new Point2D.Double();

            // Add the atom to the data set.
            m_moleculeDataSet.addMolecule( atomPositions, moleculeCenterOfMassPosition, moleculeVelocity, 0 );

            // Add particle to model set.
            var atom;
            if ( moleculeID == StatesOfMatterConstants.NEON ) {
                atom = new NeonAtom( 0, 0 );
            }
            else if ( moleculeID == StatesOfMatterConstants.ARGON ) {
                atom = new ArgonAtom( 0, 0 );
            }
            else if ( moleculeID == StatesOfMatterConstants.USER_DEFINED_MOLECULE ) {
                atom = new ConfigurableStatesOfMatterAtom( 0, 0 );
            }
            else {
                atom = new NeonAtom( 0, 0 );
            }
            this.particles.push( atom );
        }

        // Initialize the particle positions according the to requested phase.
        this.setPhase( phase );
    }

  } );
} );
