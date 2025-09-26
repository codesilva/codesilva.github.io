import { useState } from 'react';
import './Grid.css';

const ICON = '👆';
const headingIndex = ['up', 'right', 'down', 'left'];
const GRID_SIZE = 10;
const TRANSITIONS = {
  'up': { x: 0, y: -1 },
  'right': { x: 1, y: 0 },
  'down': { x: 0, y: 1 },
  'left': { x: -1, y: 0 },
}
const getNextHeading = (currentHeading) => {
  const nextHeadingIndex = (headingIndex.indexOf(currentHeading) + 1) % headingIndex.length;
  return headingIndex[nextHeadingIndex];
};

export function Grid() {
  const [position, setPosition] = useState({ coords: { x: 0, y: 0 }, heading: 'up' });

  const moveForward = () => {
    const coords = {
      x: position.coords.x + TRANSITIONS[position.heading].x,
      y: position.coords.y + TRANSITIONS[position.heading].y,
    };
    const crossedX = coords.x < 0 || coords.x >= GRID_SIZE;
    const crossedY = coords.y < 0 || coords.y >= GRID_SIZE;
    const crossedBoard = crossedX || crossedY;
    const heading = crossedBoard ? getNextHeading(position.heading) : position.heading;

    setPosition({
      coords: {
        x: crossedX ? position.coords.x : coords.x,
        y: crossedY ? position.coords.y : coords.y,
      },
      heading
    });
  };

  const rotate90Deg = () => {
    setPosition({
      ...position,
      heading: getNextHeading(position.heading)
    });
  };

  return <>
    <button onClick={moveForward}>Forward</button>
    <button onClick={rotate90Deg}>Rotate 90 deg</button>

    <div className='grid'>
      {Array.from({ length: GRID_SIZE }).map((_, i) => (
        <div className='row' key={i}>
          {Array.from({ length: GRID_SIZE }).map((_, j) => (
            <div className='cell' key={j}>
              {position.coords.x === j && position.coords.y === i ? <span className={ `roomba ${position.heading}` }>{ ICON }</span> : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  </>;
}
