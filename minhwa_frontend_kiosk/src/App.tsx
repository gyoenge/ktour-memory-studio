import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import KioskLayout from './components/studio/KioskLayout';
import PhotoSelectionScreen from './screens/PhotoSelectionScreen';
import CustomizationScreen from './screens/CustomizationScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultScreen from './screens/ResultScreen';

import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import type { AppStep, UserSelections } from './types';
import IntroScreen from './screens/IntroScreen';
import { AnimatePresence, motion } from 'framer-motion';

// const screenVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
//   transition: { duration: 1 }
// };

function App() {
  const [step, setStep] = useState<AppStep>('INTRO');
  const [selections, setSelections] = useState<UserSelections>({
    photo: null,
    background: null,
    elements: [],
  });

  const handleIntroNext = () => setStep('PHOTO_SELECTION'); 

  const handlePhotoSelect = (photo: string) => {
    setSelections(prev => ({ ...prev, photo }));
    setStep('CUSTOMIZATION');
  };

  const handleCustomization = (background: string, elements: string[]) => {
    setSelections(prev => ({ ...prev, background, elements }));
    setStep('LOADING');
  };

  const handleLoadingFinish = () => {
    setStep('RESULT');
  };

  const handleRestart = () => {
    setSelections({ photo: null, background: null, elements: [] });
    setStep('INTRO');
  };

  const renderCurrentScreen = () => {
    switch (step) {
      case 'INTRO':
        return (
          // <motion.div key="INTRO" {...screenVariants}>
            <IntroScreen onNext={handleIntroNext} />
          // </motion.div>
        );
      case 'PHOTO_SELECTION':
        return (
          // <motion.div key="PHOTO_SELECTION" {...screenVariants}>
            <PhotoSelectionScreen onNext={handlePhotoSelect} />
          // </motion.div>
        );
      case 'CUSTOMIZATION':
        return (
          // <motion.div key="CUSTOMIZATION" {...screenVariants}>
            <CustomizationScreen onNext={handleCustomization} />
          // </motion.div>
        );
      case 'LOADING':
        return (
          // <motion.div key="LOADING" {...screenVariants}>
            <LoadingScreen onFinished={handleLoadingFinish} />
          // </motion.div>
        );
      case 'RESULT':
        return (
          // <motion.div key="RESULT" {...screenVariants}>
            <ResultScreen selections={selections} onRestart={handleRestart} />
          // </motion.div>
        );
      default:
        return (
          // <motion.div key="default" {...screenVariants}>
            <IntroScreen onNext={handleIntroNext} />
          // </motion.div>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <KioskLayout>
        <AnimatePresence>
          {renderCurrentScreen()}
        </AnimatePresence>
      </KioskLayout>
    </ThemeProvider>
  );
}

export default App;
