import React, { useEffect, useState } from 'react';
import { Stage, Sprite, Container, Text } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import useWindowSize from '../hooks/useWindowSize';

interface Props {
  pins: {
    xRatio: number;
    yRatio: number;
  }[];
  addPin: (position: { xRatio: number; yRatio: number }) => void;
  clickPinHandler: (index: number) => void;
}

const numberStyle = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fill: ['#ffffff'],
  fontWeight: 'bold',
});
const Pixi = (props: Props) => {
  const [scale, setScale] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowSize = useWindowSize();

  const canvasWidth = (windowSize.width - 300) / window.devicePixelRatio || 1;
  const canvasHeight = windowSize.height / window.devicePixelRatio || 1;
  const anchor = 0.5;

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

  return (
    <Stage width={canvasWidth} height={canvasHeight} id="canvas">
      <Container>
        <Sprite
          texture={PIXI.Texture.from('./images/sample.jpg')}
          anchor={anchor}
          x={position.x + canvasWidth * anchor}
          y={position.y + canvasHeight * anchor}
          scale={scale}
          interactive={true}
          pointerdown={(e: PIXI.InteractionEvent) => {
            const imageSize = { x: originalImageSize.x * scale, y: originalImageSize.y * scale };
            const xRatio =
              (e.data.global.x - ((canvasWidth - imageSize.x) / 2 + position.x)) / imageSize.x;
            const yRatio =
              (e.data.global.y - ((canvasHeight - imageSize.y) / 2 + position.y)) / imageSize.y;
            props.addPin({
              xRatio,
              yRatio,
            });
          }}
        />
        {props.pins.map((p, i) => {
          const positionX =
            originalImageSize.x * scale * p.xRatio +
            (canvasWidth - originalImageSize.x * scale) / 2 +
            position.x;
          const positionY =
            originalImageSize.y * scale * p.yRatio +
            (canvasHeight - originalImageSize.y * scale) / 2 +
            position.y;
          return (
            <React.Fragment key={`${p.xRatio} ${p.yRatio}`}>
              <Sprite
                texture={PIXI.Texture.from('./images/pin.svg')}
                anchor={anchor}
                x={positionX}
                y={positionY - 10}
                scale={0.23}
                click={() => props.clickPinHandler(i)}
                interactive={true}
                cursor="pointer"
              />
              <Text
                text={String(i + 1)}
                x={i < 9 ? positionX - 2 : positionX - 5}
                y={positionY - 18}
                scale={0.3}
                style={numberStyle}
              />
            </React.Fragment>
          );
        })}
      </Container>
    </Stage>
  );
};

export { Pixi };
