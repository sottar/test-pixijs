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
      messages: { id: string; author: string; createdAt: string; message: string }[];
      inputValue: string;
      pin: { xRatio: number; yRatio: number }; // 0 ~ 1
    }[]
  >([]);

  const createNewChat = (position: { xRatio: number; yRatio: number }) => {
    setChatList(current => [
      ...current,
      {
        messages: [],
        inputValue: '',
        pin: position,
      },
    ]);
  };

  const updateMessageHandler = (value: string, index: number) => {
    setChatList(current => {
      const tmp = [...current];
      tmp[index].inputValue = value;
      return tmp;
    });
  };

  const submitMessageHandler = (index: number) => {
    if (chatList[index].inputValue === '') {
      return;
    }
    const date = new Date();
    setChatList(current => {
      const tmp = [...current];
      tmp[index].messages.push({
        id: String(tmp[index].messages.length + 1),
        author: 'Sota Ohara',
        createdAt: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
        message: tmp[index].inputValue,
      });
      tmp[index].inputValue = '';
      return tmp;
    });
  };

  const pinList = useMemo(() => {
    return chatList.map(c => c.pin);
  }, [chatList]);

  return (
    <Wrapper>
      <Pixi pins={pinList} addPin={createNewChat} />
      <Chat
        chatList={chatList}
        updateMessageHandler={updateMessageHandler}
        submitMessageHandler={submitMessageHandler}
      />
    </Wrapper>
  );
};

export { App };
