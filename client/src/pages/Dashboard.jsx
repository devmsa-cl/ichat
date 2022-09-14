import { useRef, useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../context/context';
import Wrapper from '../styles/layout/Wrapper';
import Chat from '../styles/layout/Chat';
import Message from '../styles/components/Message';
import MessageInput from '../styles/components/MessageInput';
import { FaRegPaperPlane } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import Button from '../styles/components/Button';
import moment from 'moment';
import io from 'socket.io-client';

const socketURL =
  process.env.REACT_APP_ENV === 'pro' ? '' : process.env.REACT_APP_SOCKETIO_DEV;

const socket = io(socketURL, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
});

console.log(socket);

function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const messageRef = useRef();
  const messageContainerRef = useRef();
  const [input, setInput] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const { user, logoutUser } = useAppContext();
  const [chatUsers, setChatUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const createMessage = ({ user, message }) => {
    const msg = {};
    msg.id = Math.round(Math.random() * 9343999 + 1);
    msg.text = message;
    msg.username = user.username;
    msg.date = Date.now();

    setMessages((state) => {
      return [...state, { ...msg }];
    });
  };
  const messageInputHandle = (e) => {
    const { shiftKey } = e;

    // if (e.keyCode === 13 && !shiftKey) {
    //   // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
    //   document.execCommand('insertHTML', false, '<br/>');
    //   // prevent the default behaviour of return key pressed
    //   return false;
    // }

    if (e.code === 'Enter' && shiftKey) {
      e.preventDefault();
      // document.execCommand('insertLineBreak');
      // setInput(e.target.innerHTML);
      console.log(e.target.innerHTML);
      return;
    }

    // FIXME: there already last <br>
    if (e.code === 'Enter') {
      const last = e.target.childNodes[e.target.childNodes.length - 1];
      if (last.tagName === 'BR') last.remove();

      if (e.target.childNodes[0].tagName === 'BR') return;
      sendNewMessage(e.target.innerHTML);
      e.target.innerHTML = '';
      setInput('');
      return true;
    }

    setInput(e.target.innerHTML);
  };

  const sendNewMessage = (newMessage) => {
    socket.emit('chatMessage', newMessage);
  };

  const socketHandle = () => {
    socket.on('open-connection', (msg) => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.emit('join', { user: user });

    socket.on('message', ({ user, message }) => {
      createMessage({ user, message });
    });

    socket.on('userJoined', ({ user, message }) => {
      createMessage({ user, message });
    });
    socket.on('chatUsers', ({ users }) => {
      setChatUsers(users);
    });

    socket.on('chatMessage', ({ user, message }) => {
      createMessage({ user, message });
    });

    return () => {
      socket.off('open-connection');
      socket.off('close-connection');
      socket.off('chatMessage');
      socket.off('pong');
    };
  };

  const scrollMessage = () => {
    messageRef.current.focus();
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    socketHandle();
    scrollMessage();
  }, []);

  useEffect(() => {
    scrollMessage();
  }, [messages]);

  return (
    <Wrapper>
      <Chat>
        <div className="chat">
          <div className="messages" ref={messageContainerRef}>
            {messages.map((msg) => {
              if (msg.username === user.username) {
                return (
                  <Message me key={msg.id}>
                    <header>
                      <p>{msg.username}</p>
                      <span>
                        {moment(new Date(msg.date)).startOf('second').fromNow()}
                      </span>
                    </header>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: msg.text,
                      }}
                    ></p>
                  </Message>
                );
              }
              return (
                <Message key={msg.id}>
                  <header>
                    <p>{msg.username}</p>
                    <span>
                      {moment(new Date(msg.date)).startOf('second').fromNow()}
                    </span>
                  </header>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: msg.text,
                    }}
                  ></p>
                </Message>
              );
            })}
          </div>
          <div className="message-input">
            <MessageInput>
              <div
                className={`message${
                  input && input.length > 0 ? ' active' : ''
                }`}
                contentEditable="true"
                ref={messageRef}
                suppressContentEditableWarning={'true'}
                onKeyUpCapture={messageInputHandle}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    document.execCommand(
                      'defaultParagraphSeparator',
                      false,
                      'br'
                    );
                  }
                }}
              ></div>
              <FaRegPaperPlane
                onClick={() => {
                  messageRef.current.innerHTML = '';
                  sendNewMessage(input);
                }}
              />
            </MessageInput>
          </div>
        </div>
        <div className={`panel${showPanel ? ' show' : ''}`}>
          <BsFillPeopleFill
            className="toggle"
            onClick={() => setShowPanel(!showPanel)}
          />
          <div className="user">
            <figure>
              <img
                src="https://appsumo2-cdn.appsumo.com/media/users/avatars/copy_of_me_GTA_theme.jpg?width=100height=100aspect_ratio=1:1"
                alt="avatar"
                aria-label="User avatar"
              />
              <figcaption>
                <h2>Chercllor</h2>
              </figcaption>
            </figure>
          </div>
          <div className="room-users">
            <h4>Room user:</h4>
            <ul>
              {chatUsers.map((u, i) => {
                return <li key={i}>{u.username}</li>;
              })}
            </ul>
          </div>

          <Button
            secondary
            onClick={() => {
              socket.close();
              socket.open();
              logoutUser();
            }}
          >
            Logout
          </Button>
        </div>
      </Chat>
    </Wrapper>
  );
}

export default Dashboard;
