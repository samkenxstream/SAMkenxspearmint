/* eslint-disable linebreak-style */
import React, { useContext, useReducer, Fragment } from 'react';
import ReactModal from 'react-modal';
let styles = {};
import modalStyles from '../../components/Modals/Modal.module.scss';
import testStyles from './TestFile.module.scss'
Object.assign(styles, modalStyles, testStyles)
// import styles from '../../components/Modals/Modal.module.scss';

import Draggable from 'react-draggable';
// A simple JavaScript utility for conditionally joining classNames together
import cn from 'classnames';

// may be able to delete toggleReact, etc. from their respective action files
import ReactTestCase from '../../components/TestCase/ReactTestCase';

import {
  ReduxTestCaseContext,
  reduxTestCaseState,
  reduxTestCaseReducer,
} from '../../context/reducers/reduxTestCaseReducer';
import ReduxTestCase from '../../components/TestCase/ReduxTestCase';

import {
  HooksTestCaseContext,
  hooksTestCaseState,
  hooksTestCaseReducer,
} from '../../context/reducers/hooksTestCaseReducer';
import HooksTestCase from '../../components/TestCase/HooksTestCase';

import {
  EndpointTestCaseContext,
  endpointTestCaseState,
  endpointTestCaseReducer,
} from '../../context/reducers/endpointTestCaseReducer';
import EndpointTestCase from '../../components/TestCase/EndpointTestCase';

import {
  puppeteerTestCaseState,
  puppeteerTestCaseReducer,
  PuppeteerTestCaseContext,
} from '../../context/reducers/puppeteerTestCaseReducer';
import PuppeteerTestCase from '../../components/TestCase/PuppeteerTestCase';

import {
  MockDataContext,
  mockDataState,
  mockDataReducer,
} from '../../context/reducers/mockDataReducer';

import {
  AccTestCaseContext,
  accTestCaseState,
  accTestCaseReducer,
} from '../../context/reducers/accTestCaseReducer';
import AccTestCase from '../../components/TestCase/AccTestCase';

import {
  SecTestCaseContext,
  secTestCaseState,
  secTestCaseReducer,
} from '../../context/reducers/secTestCaseReducer';
import SecTestCase from '../../components/TestCase/SecTestCase';

import {
  VueTestCaseContext,
  vueTestCaseState,
  vueTestCaseReducer,
} from '../../context/reducers/vueTestCaseReducer';
import VueTestCase from '../../components/TestCase/VueTestCase';

import {
  SvelteTestCaseContext,
  SvelteTestCaseState,
  SvelteTestCaseReducer
} from '../../context/reducers/svelteTestCaseReducer';
import SvelteTestCase from '../../components/TestCase/SvelteTestCase';


// import {
//   SvelteTestCaseContext,
//   SvelteTestCaseState,
//   SvelteTestCaseReducer
// } from '../../context/reducers/svelteTestCaseReducer';
import SolidTestCase from '../../components/TestCase/SolidTestCase';






import {
  GraphQLTestCaseContext,
  graphQLTestCaseState,
  graphQLTestCaseReducer
} from '../../context/reducers/graphQLTestCaseReducer';
import GraphQLTestCase from '../../components/TestCase/GraphQLTestCase';

import { GlobalContext } from '../../context/reducers/globalReducer';
import { AiOutlineCloseCircle } from "react-icons/ai"
import { FaUniversalAccess, FaReact } from "react-icons/fa"
import { IoServer, IoLogoVue } from "react-icons/io5"
import { GiHook } from "react-icons/gi"
import { SiPuppeteer, SiRedux, SiSvelte, SiGraphql } from "react-icons/si"
import { MdSecurity } from "react-icons/md"
import { SiNextdotjs } from 'react-icons/si';

import { Button } from '@material-ui/core';
import TestCard from './TestCard';
import {
    updateFile,
    setFilePath,
    toggleRightPanel,
    setTestCase, 
    toggleModal,
    setTabIndex,
} from '../../context/actions/globalActions';

import { IconContext } from "react-icons";
import { AiFillCloseSquare } from "react-icons/ai"


const TestFile = () => {
  let [{ testCase, isTestModalOpen, projectFilePath, file, exportBool, theme }, dispatchToGlobal] = useContext(GlobalContext);
  const [mockData, dispatchToMockData] = useReducer(mockDataReducer, mockDataState);

  const [endpointTestCase, dispatchToEndpointTestCase] = useReducer(
    endpointTestCaseReducer,
    endpointTestCaseState
  );

  // //pandaWhale
  // const [nextjsTestCase, dispatchTonextjsTestCase] = useReducer(
  //   nextjsTestCaseReducer,
  //   nextjsTestCaseState
  // );
  // //pandaWhale

  const [reduxTestCase, dispatchToReduxTestCase] = useReducer(
    reduxTestCaseReducer,
    reduxTestCaseState
  );
  const [hooksTestCase, dispatchToHooksTestCase] = useReducer(
    hooksTestCaseReducer,
    hooksTestCaseState
  );
  const [puppeteerTestCase, dispatchToPuppeteerTestCase] = useReducer(
    puppeteerTestCaseReducer,
    puppeteerTestCaseState
  );
  const [accTestCase, dispatchToAccTestCase] = useReducer(
    accTestCaseReducer,
    accTestCaseState
  );
  const [secTestCase, dispatchToSecTestCase] = useReducer(
    secTestCaseReducer,
    secTestCaseState
  );
  const [graphQLTestCase, dispatchToGraphQLTestCase] = useReducer(
    graphQLTestCaseReducer,
    graphQLTestCaseState
  );

  // const [SvelteTestCase, dispatchToSvelteTestCase] = useReducer(
  //   SvelteTestCaseReducer,
  //   SvelteTestCaseState
  // )

  const filterFileType = (files, acceptedFileTypes) => {
    // files is an array of the keys in filePathMap
    const output = [];
    for (let file of files) {
      const splitName =  file.split('.');
      const fileType = splitName[splitName.length - 1];
      if(acceptedFileTypes.includes(fileType)) output.push(file);
    }
    return output;
  }

  const closeTestModal = () => {
    dispatchToGlobal(toggleModal());
  };

  const handleToggle = (test) => {
    dispatchToGlobal(setTestCase(test));
    closeTestModal();
  };

  const chooseTest = (test) => {
    dispatchToGlobal(setTestCase(test));
  };

  const modalStyles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
  };

  const cardSize = '1.1rem';

  const testMappings = {
    'react': [<FaReact size={cardSize}/>, 'React', 
              'Test React with rendering, actions, and assertions found in the React Testing Library'],
    'next.js': [<SiNextdotjs size={cardSize}/>, 'Next.js', 
              'Test Next.js front-end using the React Testing Library, or API routes on the back-end'],          
    'redux': [<SiRedux size={cardSize}/>, 'Redux', 
              'Test the pure functions of your Redux reducers, asynchronous and synchronous action creators, and the middleware logic'],
    'svelte': [<SiSvelte size={cardSize}/>, 'Svelte',
               'Newly added Svelte testing' ],
    'solid': [<>
                <svg fill="white" width={cardSize} height={cardSize} viewBox='-3 0 27 27'>
                  <path d="M11.558.788A9.082 9.082 0 0 0 9.776.99l-.453.15c-.906.303-1.656.755-2.1 1.348l-.301.452-2.035 3.528c.426-.387.974-.698 1.643-.894h.001l.613-.154h.001a8.82 8.82 0 0 1 1.777-.206c2.916-.053 6.033 1.148 8.423 2.36 2.317 1.175 3.888 2.32 3.987 2.39L24 5.518c-.082-.06-1.66-1.21-3.991-2.386-2.393-1.206-5.521-2.396-8.45-2.343zM8.924 5.366a8.634 8.634 0 0 0-1.745.203l-.606.151c-1.278.376-2.095 1.16-2.43 2.108-.334.948-.188 2.065.487 3.116.33.43.747.813 1.216 1.147L12.328 10h.001a6.943 6.943 0 0 1 6.013 1.013l2.844-.963c-.17-.124-1.663-1.2-3.91-2.34-2.379-1.206-5.479-2.396-8.352-2.344zm5.435 4.497a6.791 6.791 0 0 0-1.984.283L2.94 13.189 0 18.334l9.276-2.992a6.945 6.945 0 0 1 7.408 2.314v.001c.695.903.89 1.906.66 2.808l2.572-4.63c.595-1.041.45-2.225-.302-3.429a6.792 6.792 0 0 0-5.255-2.543zm-3.031 5.341a6.787 6.787 0 0 0-2.006.283L.008 18.492c.175.131 2.02 1.498 4.687 2.768 2.797 1.332 6.37 2.467 9.468 1.712l.454-.152h.002c1.278-.376 2.134-1.162 2.487-2.09.353-.93.207-2.004-.541-2.978a6.791 6.791 0 0 0-5.237-2.548z"></path>
                </svg>
              </>, 'Solid',
                        'Test Solid with rendering, actions, and assertions'],
    'hooks': [<GiHook size={cardSize}/>, 'Hooks', 
              'Make assertions to test your React hooks with available hook parameters and callback functions'],
    'vue': [<IoLogoVue size={cardSize}/>, 'Vue',
              'Vue tests allow for testing mounted Vue instances and single page components with Vue Test Utils'],
    'puppeteer': [<SiPuppeteer size={cardSize}/>, 'Puppeteer',
              'Use the puppeteer node library to conduct headless browser testing on the Chrome Browser'],
    'endpoint': [<IoServer size={cardSize}/>, 'Endpoint',
               'Make sure your HTTP routes are getting the correct response by testing your server with Supertest'],
    'acc': [<FaUniversalAccess size={cardSize}/>, 'Accessibility',
            'Maintain a good accessibility score by testing the various attributes of your website'],
    'sec': [<MdSecurity size={cardSize}/>, 'Security',
            'Evaluate security vulnerabilities using Synk'],
    'graphQL': [<SiGraphql size={cardSize}/>, 'GraphQL',
            'Testing GraphQL'],

  }

  const allButtons = (Object.keys(testMappings)).map((elem, idx) => {
    return (
      <Button 
        variant="outlined" 
        onClick={() => handleToggle(elem)}
        key={idx}
      >
        <span>{testMappings[elem][1]}</span>
        {testMappings[elem][0]}
      </Button>
    );
  })

  const allCards = (Object.keys(testMappings)).map((elem, idx) => {
    return (
      <TestCard 
        icon={testMappings[elem][0]}
        type={testMappings[elem][1]}
        description={testMappings[elem][2]}
        onClick={() => chooseTest(elem)}
        key={idx}
      />
    );
  })

  return (
    // landing modal which displays button choices
    <div>
      <ReactModal
        className={styles.modal}
        isOpen={isTestModalOpen}
        onRequestClose={closeTestModal}
        contentLabel='Save?'
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
        overlayClassName={styles[`modalOverlay${theme}`]}
      >
        <Draggable>
          <div id={styles.container}>
            
            <AiOutlineCloseCircle
              tabIndex={0}
              id={styles.escapeButton} 
              onKeyPress={closeTestModal}
              onClick={closeTestModal}
            />  
            <div id={styles.body}>
              <p id={styles.text}>What would you like to test?</p>
              <div id={styles.newTestButtons}>
              {allButtons}
              </div>
            </div>
          </div>
        </Draggable>
      </ReactModal>
      
      {/* instantiate context for each test option */}
      {testCase === 'redux' && (
        <section>
          <ReduxTestCaseContext.Provider value={[reduxTestCase, dispatchToReduxTestCase]}>
            <ReduxTestCase/>
          </ReduxTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'react' && (
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <ReactTestCase filterFileType = {filterFileType}/>
        </MockDataContext.Provider>
      )}

      //pandaWhale
      {testCase === 'nextjs' && (
        <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
          <NextJSTestCase filterFileType = {filterFileType}/>
        </MockDataContext.Provider>
      )}
      //pandaWhale

      {testCase === 'endpoint' && (
        <section>
          <EndpointTestCaseContext.Provider value={[endpointTestCase, dispatchToEndpointTestCase]}>
            <EndpointTestCase />
          </EndpointTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'hooks' && (
        <section>
          <HooksTestCaseContext.Provider value={[hooksTestCase, dispatchToHooksTestCase]}>
            <HooksTestCase />
          </HooksTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'puppeteer' && (
        <section>
          <PuppeteerTestCaseContext.Provider
            value={[puppeteerTestCase, dispatchToPuppeteerTestCase]}
          >
            <PuppeteerTestCase />
          </PuppeteerTestCaseContext.Provider>
        </section>
      )}


      {testCase === 'acc' && (
        <section>
          <AccTestCaseContext.Provider value={[accTestCase, dispatchToAccTestCase]}>
            <AccTestCase />
          </AccTestCaseContext.Provider>
        </section>
      )}
      {testCase === 'sec' && (
        <section>
          <SecTestCaseContext.Provider value={[secTestCase, dispatchToSecTestCase]}>
            <SecTestCase />
          </SecTestCaseContext.Provider>
        </section>
      )}
      {
        testCase === 'vue' && (
          <section>
            <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
              <VueTestCase filterFileType = {filterFileType} />
            </MockDataContext.Provider>
          </section>
        )
      }

      {testCase === 'svelte' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <SvelteTestCase filterFileType = {filterFileType} />
          </MockDataContext.Provider >
        </section>
      )}

      {testCase === 'graphQL' && (
        <section>
          <GraphQLTestCaseContext.Provider value={[graphQLTestCase, dispatchToGraphQLTestCase]}>
            <GraphQLTestCase filterFileType = {filterFileType} />
          </GraphQLTestCaseContext.Provider>
        </section>
      )}

      {testCase === 'solid' && (
        <section>
          <MockDataContext.Provider value={[mockData, dispatchToMockData]}>
            <SolidTestCase filterFileType = {filterFileType} />
          </MockDataContext.Provider >
        </section>
      )}

      {testCase === '' && (
          <Fragment>
            <div id={styles.testFileContainer}>
              <p id={styles.chooseTest}>CHOOSE A TEST</p>
              <div id={styles.testCardsContainer}>
                {allCards}
              </div>
            </div>
          </Fragment>
      )}
    </div>
  );
};

export default TestFile;