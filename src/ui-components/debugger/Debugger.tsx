import { useState, type JSX, type MouseEvent } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';

function Debugger(): JSX.Element {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const { sendMessage, messages } = useWebSocket();

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleAuth = () => {
    sendMessage(1, 'authorized-token');
  };

  const handlePlayerMove = () => {
    sendMessage(2, JSON.stringify({ x: 323.1, y: 2.2, z: 1 }));
  };

  return (
    <div
      className='debugger-container'
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button onClick={handleAuth}>Test auth</button>
      <button onClick={handlePlayerMove}>Test player move</button>
      <button onClick={() => console.log(messages)}>Log Messages</button>
    </div>
  );
}

export default Debugger;
