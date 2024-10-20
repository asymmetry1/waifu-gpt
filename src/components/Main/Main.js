import React, { useState, useRef, useContext } from 'react';
import './Main.css';
import TextareaAutosize from 'react-textarea-autosize';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';

function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showStartText, setShowStartText] = useState(true);
  const [chatLog, setChatLog] = useState([]);
  const chatLogContainerRef = useRef(null);

  const { onSent, loading, resultData, setInputValue, inputValue } = useContext(Context);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      setShowStartText(false);
      setInputValue(inputValue);
      onSent();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (resultData) {
      setChatLog((prevChatLog) => [...prevChatLog, resultData]);
    }
    setChatLog((prevChatLog) => [...prevChatLog, inputValue]);
    setInputValue('');
    if (chatLogContainerRef.current) {
      chatLogContainerRef.current.scrollTop = chatLogContainerRef.current.scrollHeight;
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <div className="topNav">
        <a href="#Account" className="split">
          <span className="icon">
            <ion-icon name="person-circle"></ion-icon>
          </span>
        </a>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="close-icon" onClick={handleToggleSidebar}>
            {isSidebarOpen ? (
              <ion-icon name="chevron-back-outline"></ion-icon>
            ) : (
              <ion-icon name="chevron-forward-outline"></ion-icon>
            )}
          </span>
          <h2 className='cHistory'>Chat History</h2>
        </div>
        <ul className={`cList ${isSidebarOpen ? 'open' : ''}`}>
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
        </ul>
      </div>

      <div className="imwaifu">
        <img id="waifu" src={assets.waifu} alt="waifu"></img>
      </div>

      <div>
        <img id="bg" src={assets.bg} alt="bg"></img>
      </div>

      {showStartText ? (
        <div className="startText">
          <h1>welcome to waifu-gpt</h1>
        </div>
      ) : (
        <section ref={chatLogContainerRef} className="chatBox">
          <div className="chat-log">
            {chatLog.map((message, index) => (
              <div key={index} className="chat-message">
                <div className="chat-message-center">
                  <div className="avatar"></div>
                  <div className="message">{message}</div>
                </div>
              </div>
            ))}
            {resultData || loading ? (
              <div className="chat-message-bot">
                <div className="chat-message-center">
                  <div className="avatar"></div>
                  <div className="message-bot">
                    {loading ? (
                      <div className="loader-typing">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    ) : (
                      <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}
      <div className="chat-input-holder">
        <TextareaAutosize
          className="chat-input-textarea"
          style={{ boxSizing: 'border-box' }}
          rows={1}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="insert text here"
        />
      </div>
    </div>
  );
}

export default Main;