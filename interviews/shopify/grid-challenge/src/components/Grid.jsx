import { useState } from 'react';

import { Row } from './Row';
import { Cell } from './Cell';
import './Grid.css';

const ICON = '👆';
// const iconDirectionMap = {
//   'up': '👆',
//   'down': '👇',
//   'left': '👈',
//   'right': '👉',
// };

const headingIndex = ['up', 'right', 'down', 'left'];
const GRID_SIZE = 10;
const calculateNextHeading = (currentHeading) => {
  const nextHeadingIndex = (headingIndex.indexOf(currentHeading) + 1) % headingIndex.length;
  return headingIndex[nextHeadingIndex];
};
const stateTransitions = {
  'up': ({ coords: { x, y } }) => {
    return { coords: { x, y: y - 1 } };
  },
  'right': ({ coords: { x, y } }) => {
    return { coords: { x: x + 1, y } };
  },
  'down': ({ coords: { x, y } }) => {
    return { coords: { x, y: y + 1 } };
  },
  'left': ({ coords: { x, y } }) => {
    return { coords: { x: x - 1, y } };
  },
};

export function Grid() {
  const [position, setPosition] = useState({ coords: { x: 0, y: 0 }, heading: 'up' });

  const moveForward = () => {
    const { coords } = stateTransitions[position.heading](position);
    const crossedX = coords.x < 0 || coords.x >= GRID_SIZE;
    const crossedY = coords.y < 0 || coords.y >= GRID_SIZE;
    const crossedBoard = crossedX || crossedY;
    const heading = crossedBoard ? calculateNextHeading(position.heading) : position.heading;

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
      heading: calculateNextHeading(position.heading)
    });
  };

  return <>
    <button onClick={moveForward}>Forward</button>
    <button onClick={rotate90Deg}>Rotate 90 deg</button>

    <div className='grid'>
      {Array.from({ length: GRID_SIZE }).map((_, i) => (
        <Row key={i}>
          {Array.from({ length: GRID_SIZE }).map((_, j) => (
            <Cell key={j}>
              {/*position.coords.x === j && position.coords.y === i ? <span className={ `roomba ${position.heading}` }>{ iconDirectionMap[position.heading] }</span> : null*/}

              {position.coords.x === j && position.coords.y === i ? <span className={ `roomba ${position.heading}` }>{ ICON }</span> : null}
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  </>;
}
