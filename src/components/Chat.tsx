import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 10px;
  width: 300px;
  box-sizing: border-box;
  flex-shrink: 0;
`;
const Head = styled.p`
  font-weight: bold;
`;
const ChatList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;
const ChatItem = styled.li`
  .author {
    font-size: 12px;
    font-weight: bold;
  }
  .createdAt {
    margin-left: 16px;
    font-size: 12px;
    color: #888;
  }
  .message {
    margin: 4px 4px 8px;
  }
  .input {
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }
`;

interface Props {
  chatList: {
    messages: { id: string; author: string; createdAt: string; message: string }[];
    inputValue: string;
    pin: { xRatio: number; yRatio: number }; // 0 ~ 1
  }[];
  activeChatIndex: number;
  updateMessageHandler: (value: string, index: number) => void;
  submitMessageHandler: (index: number) => void;
}

const Chat = ({ chatList, activeChatIndex, updateMessageHandler, submitMessageHandler }: Props) => {
  return (
    <Wrapper>
      <Head>Chats</Head>
      <ChatList>
        {chatList.map((c, i) => (
          <ChatItem key={c.pin.xRatio}>
            {c.messages.map(m => (
              <div key={c.pin.xRatio + c.pin.yRatio + m.id}>
                <span className="author">{m.author}</span>
                <span className="createdAt">{m.createdAt}</span>
                <p className="message">{m.message}</p>
              </div>
            ))}
            {i === activeChatIndex && (
              <>
                <textarea
                  className="input"
                  name=""
                  onChange={e => updateMessageHandler(e.currentTarget.value, i)}
                  value={c.inputValue}
                  rows={4}
                ></textarea>
                <button onClick={() => submitMessageHandler(i)}>post</button>
              </>
            )}
          </ChatItem>
        ))}
      </ChatList>
    </Wrapper>
  );
};

export { Chat };
