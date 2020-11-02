import React, { useEffect, useState } from 'react';
import { Stage, Sprite, Container } from '@inlet/react-pixi';
import { InteractionEvent } from 'pixi.js';
import useWindowSize from '../hooks/useWindowSize';

interface Props {
  pins: {
    x: number;
    y: number;
  }[];
  addPin: (position: { x: number; y: number }) => void;
}

const Pixi = (props: Props) => {
  const [scale, setScale] = useState(0.5);
  const windowSize = useWindowSize();
  const wheelHandler = (e: WheelEvent) => {
    setScale(currentState => Math.min(Math.max(0.05, currentState + e.deltaY * -0.001), 1));
    // disable browser default pinching in/out
    e.preventDefault();
  };

  useEffect(() => {
    const el = document.getElementsByTagName('canvas')[0];
    el.onwheel = e => {
      wheelHandler(e);
    };
    return () => {
      el.onwheel = null;
    };
  }, []);

  return (
    <Stage width={(windowSize.width - 300) / 2} height={windowSize.height} id="canvas">
      <Container>
        <Sprite
          image="./images/sample.jpg"
          anchor={0}
          x={0}
          y={0}
          scale={scale}
          interactive={true}
          pointerdown={(e: InteractionEvent) => {
            const position = {
              x: e.data.global.x,
              y: e.data.global.y - 10,
            };
            props.addPin(position);
          }}
        />
        {props.pins.map(p => (
          <Sprite
            key={`${p.x} ${p.y}`}
            image="./images/pin.png"
            anchor={0.5}
            x={p.x}
            y={p.y}
            scale={0.05}
            interactive={true}
          />
        ))}
      </Container>
    </Stage>
  );
};

export { Pixi };
