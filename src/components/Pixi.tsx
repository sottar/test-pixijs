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
  const [scale, setScale] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowSize = useWindowSize();
  const wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    if (!Number.isInteger(e.deltaY)) {
      setScale(currentState => Math.min(Math.max(0.05, currentState + e.deltaY * -0.001), 1));
      // TODO pinching in/out した場所に応じて anchor 変える
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

  const [originalImageSize, setOriginalImageSize] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = './images/sample.jpg';

    img.onload = function () {
      const _this = (this as unknown) as { width: number; height: number };
      setOriginalImageSize({ x: _this.width, y: _this.height });
    };
  }, []);

  useEffect(() => {
    if (originalImageSize.x === 0) {
      return;
    }
    if (originalImageSize.x >= originalImageSize.y) {
      setScale(canvasWidth / originalImageSize.x);
      return;
    }
    setScale(canvasHeight / originalImageSize.y);
  }, [originalImageSize]);

  const canvasWidth = (windowSize.width - 300) / 2;
  const canvasHeight = windowSize.height / 2;
  const anchor = 0.5;
  return (
    <Stage width={canvasWidth} height={canvasHeight} id="canvas">
      <Container>
        <Sprite
          image="./images/sample.jpg"
          anchor={anchor}
          x={position.x + canvasWidth * anchor}
          y={position.y + canvasHeight * anchor}
          scale={scale}
          interactive={true}
          pointerdown={(e: InteractionEvent) => {
            const pinPosition = {
              xRatio: e.data.global.x,
              yRatio: e.data.global.y - 10,
            };
            props.addPin(pinPosition);
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
