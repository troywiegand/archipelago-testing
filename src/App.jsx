import { useState, useEffect } from 'react'
import { Client } from 'archipelago.js';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('');
  const [s, setS] = useState('');
  const [client, setClient] = useState(null);

  const [all, setAll] = useState([]);

  useEffect(() => {
    setClient(new Client());
  }, []);
  
  useEffect(() => {
    if(client!=null){
        client.login('localhost:38281', 'Troy').then(() => console.log('Connected to AP')).catch(console.error);
        client.messages.on('message', (content) => {
          console.log(content);
          setMessage(content);
        });
    }
  }, [client]);

  useEffect(() => {
      if(message) {
          setAll([...all, message])
      }
  }, [message])

  const updateMessage = (e) => {
    setS(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault();
    client.messages.say(s);
  }

const someText = () => {
    return JSON.stringify(client?.players?.slots)
}

  return (
    <>
      <h1>Archipelago Test</h1>
      <div className="card">
      <h3> Slot Info </h3>
      {someText()}
      <h3> Chat </h3>
      {all.length>0 && all?.reduce((p,c)=>[p, <br />, c])}
      <br/>
      </div>
      <form onSubmit={sendMessage}>
      <input type='text' onChange={updateMessage} />
      </form>
    </>
  )
}

export default App
