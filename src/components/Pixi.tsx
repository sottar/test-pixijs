import React, { useEffect, useState } from 'react';
import { Stage, Sprite, Container } from '@inlet/react-pixi';
import { InteractionEvent } from 'pixi.js';
import useWindowSize from '../hooks/useWindowSize';

interface Props {
  pins: {
    xRatio: number;
    yRatio: number;
  }[];
  addPin: (position: { xRatio: number; yRatio: number }) => void;
}

const Pixi = (props: Props) => {
  const [scale, setScale] = useState(0.2);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  // TODO pinching in/out した場所に応じて anchor 変える
  const windowSize = useWindowSize();
  const wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    if (!Number.isInteger(e.deltaY)) {
      setScale(currentState => Math.min(Math.max(0.05, currentState + e.deltaY * -0.001), 1));
      return;
    }
    setPosition(currentState => ({ x: currentState.x - e.deltaX, y: currentState.y - e.deltaY }));
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
          x={position.x}
          y={position.y}
          scale={scale}
          interactive={true}
          pointerdown={(e: InteractionEvent) => {
            const position = {
              xRatio: e.data.global.x,
              yRatio: e.data.global.y - 10,
            };
            props.addPin(position);
          }}
        />
        {props.pins.map(p => (
          <Sprite
            key={`${p.xRatio} ${p.yRatio}`}
            image="./images/pin.png"
            anchor={0.5}
            x={p.xRatio}
            y={p.yRatio}
            scale={0.05}
            interactive={true}
          />
        ))}
      </Container>
    </Stage>
  );
};

export { Pixi };
