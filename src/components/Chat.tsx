import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 300px;
  box-sizing: border-box;
  border-left: 1px solid #dfe3e9;
  flex-shrink: 0;
`;
const Head = styled.p`
  font-weight: bold;
  padding: 20px 10px 10px;
  box-shadow: 0px 2px 2px rgba(64, 80, 119, 0.1);
`;
const ChatList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  height: calc(100vh - 54px);
  overflow: scroll;
  scroll-behavior: smooth;
`;
const ChatItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 10px 20px;
  border-bottom: 1px solid #dfe3e9;
  .pin {
    position: sticky;
    top: 10px;
    height: 30px;
    width: 30px;
    flex-shrink: 0;
    .number {
      position: absolute;
      left: 6px;
      top: 1px;
      font-size: 12px;
      color: #fff;
    }
  }
  .content {
    width: 100%;
  }
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
    margin: 0 4px 10px;
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 20px;
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
  chatListRef: React.MutableRefObject<null>;
  activeItemRef: React.MutableRefObject<null>;
  textAreaRef: React.MutableRefObject<null>;
}

const Chat = ({
  chatList,
  activeChatIndex,
  updateMessageHandler,
  submitMessageHandler,
  chatListRef,
  activeItemRef,
  textAreaRef,
}: Props) => {
  return (
    <Wrapper>
      <Head>Chats</Head>
      <ChatList ref={chatListRef}>
        {chatList.map((c, i) => (
          <ChatItem
            key={`${c.pin.xRatio} ${c.pin.yRatio}`}
            ref={activeChatIndex === i ? activeItemRef : undefined}
          >
            <div className="pin">
              <img className="img" src="./images/pin.svg" alt="" width="20px" />
              <span className="number">{i + 1}</span>
            </div>
            <div className="content">
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
                    ref={textAreaRef}
                  ></textarea>
                  <button onClick={() => submitMessageHandler(i)}>post</button>
                </>
              )}
            </div>
          </ChatItem>
        ))}
      </ChatList>
    </Wrapper>
  );
};

export { Chat };
