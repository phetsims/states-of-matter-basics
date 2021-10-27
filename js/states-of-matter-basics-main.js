// Copyright 2014-2021, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import GlobalOptionsNode from '../../states-of-matter/js/common/view/GlobalOptionsNode.js';
import PhaseChangesScreen from '../../states-of-matter/js/phase-changes/PhaseChangesScreen.js';
import StatesScreen from '../../states-of-matter/js/states/StatesScreen.js';
import Tandem from '../../tandem/js/Tandem.js';
import statesOfMatterBasicsStrings from './statesOfMatterBasicsStrings.js';

const statesOfMatterBasicsTitleString = statesOfMatterBasicsStrings[ 'states-of-matter-basics' ].title;

simLauncher.launch( () => {

  const simOptions = {
    credits: {
      leadDesign: 'Paul Beale, Yuen-ying Carpenter, Sarah McKagan, Emily B. Moore, Noah Podolefsky,<br>Amy Rouinfar',
      softwareDevelopment: 'John Blanco, Aaron Davis, Aadish Gupta',
      team: 'Wendy Adams, Jack Barbera, Amy Hanson, Kelly Lancaster, Ariel Paul, Kathy Perkins,<br>Carl Wieman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Ethan Johnson, Megan Lai,<br>' +
                        'Brooklyn Lash, Liam Mulhall, Oliver Orejola, Devon Quispe, Laura Rea, Benjamin Roberts,<br>' +
                        'Jacob Romero, Kathryn Woessner, Bryan Yoelin',
      thanks: 'Thanks to Actual Concepts for working with the PhET development team to convert this simulation to HTML5.'
    },

    // create content for the Options dialog
    createOptionsDialogContent: tandem => new GlobalOptionsNode( tandem ),

    // phet-io options
    phetioDesigned: true
  };

  const sim = new Sim( statesOfMatterBasicsTitleString, [
    new StatesScreen( Tandem.ROOT.createTandem( 'statesScreen' ) ),
    new PhaseChangesScreen( false, Tandem.ROOT.createTandem( 'phaseChangesScreen' ) )
  ], simOptions );
  sim.start();
} );