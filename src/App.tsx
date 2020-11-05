import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [activeChatIndex, setActiveChatIndex] = useState(0);
  const chatListRef = useRef(null);
  const activeItemRef = useRef(null);
  const textAreaRef = useRef(null);

  const createNewChat = (position: { xRatio: number; yRatio: number }) => {
    const filteredState = chatList.filter(c => c.messages.length > 0);
    setChatList([
      ...filteredState,
      {
        messages: [],
        inputValue: '',
        pin: position,
      },
    ]);
    setActiveChatIndex(filteredState.length);
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
    const tmp = [...chatList];
    tmp[index].messages.push({
      id: String(tmp[index].messages.length + 1),
      author: 'Sota Ohara',
      createdAt: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      message: tmp[index].inputValue,
    });
    tmp[index].inputValue = '';
    setChatList(tmp);
    focusOnTextarea();
  };

  const pinList = useMemo(() => {
    return chatList.map(c => c.pin);
  }, [chatList]);

  const clickPinHandler = (index: number) => {
    clearEmptyChats();
    setActiveChatIndex(index);
  };

  useEffect(() => {
    if (!activeItemRef.current) {
      return;
    }
    const chatListRefCurrent = chatListRef.current! as { scrollTop: number };
    const activeRefCurrent = activeItemRef.current! as { offsetTop: number };
    chatListRefCurrent.scrollTop = activeRefCurrent.offsetTop - 54;
    focusOnTextarea();
  }, [activeChatIndex]);

  const clearEmptyChats = () => {
    const filteredChatList = chatList.filter(c => c.messages.length > 0);
    setChatList(filteredChatList);
  };

  const focusOnTextarea = () => {
    const textareaRefCurrent = textAreaRef.current! as { focus: () => void };
    textareaRefCurrent.focus();
  };

  return (
    <Wrapper>
      <Pixi pins={pinList} addPin={createNewChat} clickPinHandler={clickPinHandler} />
      <Chat
        chatList={chatList}
        activeChatIndex={activeChatIndex}
        updateMessageHandler={updateMessageHandler}
        submitMessageHandler={submitMessageHandler}
        chatListRef={chatListRef}
        activeItemRef={activeItemRef}
        textAreaRef={textAreaRef}
      />
    </Wrapper>
  );
};

export { App };
