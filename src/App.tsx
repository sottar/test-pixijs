import React, { useState } from 'react';
import styled from 'styled-components';
import { Chat } from './components/Chat';
import { Pixi } from './components/Pixi';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  min-width: 760px;
`;

const App = () => {
  const [pins, setPins] = useState<{ x: number; y: number }[]>([]);

  const addPin = (position: { x: number; y: number }) => {
    setPins([...pins, position]);
  };

  return (
    <Wrapper>
      <Pixi pins={pins} addPin={addPin} />
      <Chat></Chat>
    </Wrapper>
  );
};

export { App };
