import React, { useState } from 'react';
import styled from 'styled-components';
import OptionCard from '../components/studio/OptionCard';

import bgLandscape from '../assets/backgrounds/background1.png';
import bgGyeongbokgung from '../assets/backgrounds/background2.png';
import bgNamsanTower from '../assets/backgrounds/background3.png';

import elTiger from '../assets/elements/element1.png';
import elHat from '../assets/elements/element2.png';
import elMagpie from '../assets/elements/element3.png';
import elDragon from '../assets/elements/element4.png';
import elCrane from '../assets/elements/element5.png';
import elCarp from '../assets/elements/element6.png';
import { OptionCarousel } from '../components/studio/OptionCarousel';
import { ActionButton } from '../components/common/ActionButton';
import { ScreenTitle, Subtitle } from '../components/common/Title';

const backgrounds = [
    { id: 'bg1', name: 'Landscape', url: bgLandscape },
    { id: 'bg2', name: 'Gyeongbokgung', url: bgGyeongbokgung },
    { id: 'bg3', name: 'Namsan tower', url: bgNamsanTower },
];
const elements = [
    { id: 'el1', name: 'white tiger', url: elTiger },
    { id: 'el2', name: 'Korean hat', url: elHat },
    { id: 'el3', name: 'magpie', url: elMagpie },
    { id: 'el4', name: 'dragon', url: elDragon },
    { id: 'el5', name: 'crane', url: elCrane },
    { id: 'el6', name: 'carp', url: elCarp },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:  space-between; 
  height: 100%;
  padding: 20px; 
`;

interface CustomizationScreenProps {
  onNext: (background: string, elements: string[]) => void;
}

const CustomizationScreen: React.FC<CustomizationScreenProps> = ({ onNext }) => {
  const [selectedBackground, setSelectedBackground] = useState<string>(backgrounds[0].id);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const toggleElement = (id: string) => {
    setSelectedElements(prev =>
      prev.includes(id) ? prev.filter(elId => elId !== id) : [...prev, id]
    );
  };

  return (
    <Wrapper>
      <ScreenTitle style={{margin: "5px 0 5px 0"}}>
        Select background and elements
      </ScreenTitle>
      
      <Subtitle style={{margin: "10px 0 0px"}}>
        -- background --
      </Subtitle>
      <OptionCarousel showScrollbar={true}>
        {backgrounds.map(bg => (
          <OptionCard
            key={bg.id}
            item={bg}
            isSelected={selectedBackground === bg.id}
            onClick={() => setSelectedBackground(bg.id)}
          />
        ))}
      </OptionCarousel>

      <Subtitle style={{margin: "10px 0 0px"}}>
        -- elements --
      </Subtitle>
      <OptionCarousel showScrollbar={true}>
        {elements.map(el => (
          <OptionCard
            key={el.id}
            item={el}
            isSelected={selectedElements.includes(el.id)}
            onClick={() => toggleElement(el.id)}
            isElement={true}
          />
        ))}
      </OptionCarousel>

      <ActionButton onClick={() => onNext(selectedBackground, selectedElements)}>
        Create Photo!
      </ActionButton>
    </Wrapper>
  );
};

export default CustomizationScreen;
