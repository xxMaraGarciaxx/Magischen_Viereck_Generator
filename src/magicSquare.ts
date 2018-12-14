export function magicSquareOdd(n: number) {
  if (n % 2 === 0) {
    throw new Error("n must be odd");
  }
  const array = createArray(n);

  let x = (n - 1) / 2;
  let y = 0;

  for (let count = 1; count <= n ** 2; count++) {
    array[y][x] = count;
    const nextX = (x + 1) % n;
    const nextY = (y - 1 + n) % n;
    if (!array[nextY][nextX]) {
      x = nextX;
      y = nextY;
    } else {
      y = (y + 1) % n;
    }
  }
  return array;
}

export function magicSquareEvenOdd(n: number) {
  if (n % 4 === 0 || n % 2 !== 0 || n === 2) {
    throw new Error("n has to be even, but not 2");
  }
  const array = createArray(n);

  // compute each quadrant
  const topLeftArray = magicSquareOdd(n / 2);
  let offset = (n / 2) ** 2;
  const bottomRightArray = topLeftArray.map(column =>
    column.map(cell => cell + offset)
  );
  const topRightArray = bottomRightArray.map(column =>
    column.map(cell => cell + offset)
  );
  const bottomLeftArray = topRightArray.map(column =>
    column.map(cell => cell + offset)
  );

  const oneHalf = n / 2;
  const lessThanOneFourth = (n / 2 - 1) / 2;

  // switch necessary entries - top left
  for (let y = 0; y < lessThanOneFourth; y++) {
    for (let x = 0; x < lessThanOneFourth; x++) {
      // prettier-ignore
      [topLeftArray[y][x], bottomLeftArray[y][x]] = [bottomLeftArray[y][x], topLeftArray[y][x]]
    }
  }
  // switch necessary entries - bottom left
  for (let y = lessThanOneFourth + 1; y < oneHalf; y++) {
    for (let x = 0; x < lessThanOneFourth; x++) {
      // prettier-ignore
      [topLeftArray[y][x], bottomLeftArray[y][x]] = [bottomLeftArray[y][x], topLeftArray[y][x]]
    }
  }
  // switch necessary entries - center
  const center = lessThanOneFourth;
  [topLeftArray[center][center], bottomLeftArray[center][center]] = [
    bottomLeftArray[center][center],
    topLeftArray[center][center]
  ];

  // merge quadrants
  const isTopLeft = (x, y) => x < oneHalf && y < oneHalf;
  const isTopRight = (x, y) => x >= oneHalf && y < oneHalf;
  const isBottomLeft = (x, y) => x < oneHalf && y >= oneHalf;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (isTopLeft(x, y)) {
        array[y][x] = topLeftArray[y][x];
      } else if (isTopRight(x, y)) {
        array[y][x] = topRightArray[y][x - oneHalf];
      } else if (isBottomLeft(x, y)) {
        array[y][x] = bottomLeftArray[y - oneHalf][x];
      } else {
        array[y][x] = bottomRightArray[y - oneHalf][x - oneHalf];
      }
    }
  }
  return array;
}

export function magicSquareEvenEven(n: number) {
  if (n % 4 !== 0) {
    throw new Error("n must be divisible by 4");
  }
  const array = createArray(n);

  const oneFourth = n / 4;
  const threeFourth = (3 / 4) * n;
  const isTopLeft = (x, y) => x < oneFourth && y < oneFourth;
  const isTopRight = (x, y) => x >= threeFourth && y < oneFourth;
  const isBottomLeft = (x, y) => x < oneFourth && y >= threeFourth;
  const isBottomRight = (x, y) => x >= threeFourth && y >= threeFourth;
  const isCenter = (x, y) =>
    x >= oneFourth && x < threeFourth && y >= oneFourth && y < threeFourth;

  let countUp = 1;
  let countDown = n ** 2;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (
        isTopLeft(x, y) ||
        isTopRight(x, y) ||
        isBottomLeft(x, y) ||
        isBottomRight(x, y) ||
        isCenter(x, y)
      ) {
        array[y][x] = countUp;
      } else {
        array[y][x] = countDown;
      }
      countUp++;
      countDown--;
    }
  }
  return array;
}

export function createArray(n: number) {
  return Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
}

export function magicSquare(n: number) {
  if (n % 4 === 0) {
    return magicSquareEvenEven(n);
  }
  if (n % 2 === 0) {
    return magicSquareEvenOdd(n);
  }
  return magicSquareOdd(n);
}
