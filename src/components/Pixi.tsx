import React, { useEffect, useState, WheelEventHandler } from 'react';
// import { Application, Graphics } from 'pixi.js';
import { PixiComponent, Stage, Sprite, render, Container } from '@inlet/react-pixi';
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
  const scale = { x: 0.15, y: 0.15 };
  const windowSize = useWindowSize();
  console.log({ pins: props.pins });

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
