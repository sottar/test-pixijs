import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Chat } from './components/Chat';
import { Pixi } from './components/Pixi';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  min-width: 760px;
`;

const App = () => {
  const [chatList, setChatList] = useState<
    {
      messages: string[];
      pin: { xRatio: number; yRatio: number }; // 0 ~ 1
    }[]
  >([]);

  const createNewChat = (position: { xRatio: number; yRatio: number }) => {
    setChatList([...chatList, { messages: [], pin: position }]);
  };

  const pinList = useMemo(() => {
    return chatList.map(c => c.pin);
  }, [chatList]);

  return (
    <Wrapper>
      <Pixi pins={pinList} addPin={createNewChat} />
      <Chat></Chat>
    </Wrapper>
  );
};

export { App };
