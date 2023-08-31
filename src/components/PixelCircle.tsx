import styled from "styled-components";

type PixelProps = {
  pixelSize: number;
  color: string;
  positionX: number;
  positionY: number;
};
const Pixel = styled.span<PixelProps>`
  display: flex;
  width: ${({ pixelSize }) => pixelSize}px;
  height: ${({ pixelSize }) => pixelSize}px;
  background-color: ${({ color }) => color};
  position: absolute;
  // top: calc(50% - ${({ pixelSize }) => pixelSize / 2}px);
  // left: calc(50% - ${({ pixelSize }) => pixelSize / 2}px);
  transform: translate(
    ${({ positionX, positionY, pixelSize }) =>
      `${positionX * pixelSize}px, ${positionY * pixelSize}px`}
  );
`;

type PixeledCircleBaseProps = {
  radius: number;
  pixelSize: number;
};
const PixeledCircleBase = styled.div<PixeledCircleBaseProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ radius, pixelSize }) => 2 * (radius * pixelSize) + pixelSize}px;
  height: ${({ radius, pixelSize }) => 2 * (radius * pixelSize) + pixelSize}px;
  margin: auto;
  border: 1px solid black;
`;

type PixeledCircleProps = {
  pixelSize: number;
};
function PixelCircle({ pixelSize }: PixeledCircleProps) {
  const PIXEL_AMOUNT = 60 * pixelSize;
  const color = "red";
  // Calculate the radius using the formula r = sqrt(pixels / pi)
  const radius = Math.sqrt(PIXEL_AMOUNT / Math.PI);

  // Initialize the variables for the algorithm
  let x = -0.5;
  let y = radius;
  let d = 3 - 2 * radius;

  // Define a function to draw eight symmetric pixels using the circle property
  function drawSymmetricPixels(x: number, y: number) {
    // Return an array of Pixel components with the corresponding positions and color
    return [
      <Pixel
        key={Math.random()}
        color={"blue"}
        pixelSize={pixelSize}
        positionX={y}
        positionY={x}
      />,
      <Pixel
        key={Math.random()}
        color={"green"}
        pixelSize={pixelSize}
        positionX={x}
        positionY={y}
      />,
      <Pixel
        key={Math.random()}
        color={"orange"}
        pixelSize={pixelSize}
        positionX={x}
        positionY={-y}
      />,
      <Pixel
        key={Math.random()}
        color={"purple"}
        pixelSize={pixelSize}
        positionX={y}
        positionY={-x}
      />,
      <Pixel
        key={Math.random()}
        color={"pink"}
        pixelSize={pixelSize}
        positionX={-y}
        positionY={-x}
      />,
      <Pixel
        key={Math.random()}
        color={"yellow"}
        pixelSize={pixelSize}
        positionX={-x}
        positionY={-y}
      />,
      <Pixel
        key={Math.random()}
        color={"white"}
        pixelSize={pixelSize}
        positionX={-x}
        positionY={y}
      />,
      <Pixel
        key={Math.random()}
        color={"black"}
        pixelSize={pixelSize}
        positionX={-y}
        positionY={x}
      />,
    ];
  }

  // Initialize an array to store the pixels
  let pixelsArray = [];

  // Draw the first set of symmetric pixels and push them to the array
  // pixelsArray.push(...drawSymmetricPixels(x, y));

  // Loop until x is greater than or equal to y
  while (x < y) {
    // Increment x by 1
    x++;
    // If d is negative, update d by adding 4x + 6
    if (d < 0) {
      d = d + 4 * x + 6;
    }
    // Else, decrement y by 1 and update d by adding 4(x-y) + 10
    else {
      y--;
      d = d + 4 * (x - y) + 10;
    }
    // Draw the next set of symmetric pixels and push them to the array
    pixelsArray.push(...drawSymmetricPixels(x, y));
  }
  return (
    <PixeledCircleBase radius={radius} pixelSize={pixelSize}>
      {pixelsArray}
    </PixeledCircleBase>
  );
}

export default PixelCircle;
