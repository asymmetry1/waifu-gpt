import React, { useState, useRef, useContext } from 'react';
import './Main.css';
import TextareaAutosize from 'react-textarea-autosize';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets'

function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showStartText, setShowStartText] = useState(true);
  const [chatLog, setChatLog] = useState([]);
  const chatLogContainerRef = useRef(null);

  const {onSent,loading,resultData,setInputValue,inputValue} = useContext(Context);

  const handleNewChatClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleKeyPress = (event) => {

    if (event.key === 'Enter' && inputValue.trim() !== '') {

      event.preventDefault(); // Prevents the default behavior of Enter key
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

  return (
    <div className="App">
      <div className='topNav'>
        <a href='#newChat'className='nChat' onClick={handleNewChatClick}>
          <span className='icon'><ion-icon name="chatbox"></ion-icon></span>
        </a>
        <a href='#Account' className='split'>
          <span className='icon'><ion-icon name="person-circle"></ion-icon></span>
        </a>
      </div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className='close-icon' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? (
              <ion-icon name="chevron-back-outline"></ion-icon>
            ) : (
              <ion-icon name="chevron-forward-outline"></ion-icon>
            )}
          </span>
          <h2>Chat History</h2>
        </div>
        <ul>
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Chat 3</li>
        </ul>
      </div>

      <div className='imwaifu'>
        <img id='waifu' src={assets.waifu} alt='waifu'></img>
      </div>

      <div>
        <img id='bg' src={assets.bg} alt='bg'></img>
      </div>

      {showStartText ? (
      <div className='startText'>
        <h1>welcome to waifu-gpt</h1>
      </div>
      ) : (
        <section ref={chatLogContainerRef} className='chatBox'>

          <div className='chat-log'>
            {chatLog.map((message, index) => (
              <div key={index} className='chat-message'>
                <div className='chat-message-center'>
                  <div className='avatar'></div>
                  <div className='message'>{message}</div>
                </div>
              </div>
            ))}
            {resultData && (
              <div className='chat-message-bot'>
                <div className='chat-message-center'>
                  <div className='avatar'></div>
                  <div className='message-bot'>
                  {loading ? (
                    <div className="loader-typing"></div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                  </div>
                  </div>
                </div>
                )}
        </div>
      </section>
      
      )}
      <div className='chat-input-holder'>
          <TextareaAutosize className='chat-input-textarea'
            style={{boxSizing: 'border-box'}}
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
