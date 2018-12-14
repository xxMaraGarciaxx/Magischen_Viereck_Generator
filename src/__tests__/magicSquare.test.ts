import { magicSquare } from "../magicSquare";
test("testMagicSquare", () => {
  expect(magicSquare(1)).toEqual([[1]]);
  expect(() => magicSquare(2)).toThrow();
  expect(magicSquare(3)).toEqual([[8, 1, 6], [3, 5, 7], [4, 9, 2]]);
  expect(magicSquare(4)).toEqual([
    [1, 15, 14, 4],
    [12, 6, 7, 9],
    [8, 10, 11, 5],
    [13, 3, 2, 16]
  ]);
  expect(magicSquare(5)).toEqual([
    [17, 24, 1, 8, 15],
    [23, 5, 7, 14, 16],
    [4, 6, 13, 20, 22],
    [10, 12, 19, 21, 3],
    [11, 18, 25, 2, 9]
  ]);
});
