const config = require('../../src/stub/config');
const { itDoesSomethingElse } = require('../../src/mock/mock');

it('mocking callback', () => {
  // Arrange
  const callbackMock = jest.fn();

  // Act
  itDoesSomethingElse(callbackMock);

  // Assert
  expect(callbackMock).toHaveBeenCalledWith(1, 2, 3);
});

it('returns callback return value if callback is passed', () => {
  // Arrange
  const callbackMock = jest.fn();
  callbackMock.mockReturnValue(77);

  // Act
  const actualReturnValue = itDoesSomethingElse(callbackMock);

  // Assert
  expect(actualReturnValue).toBe(77);
});

it('returns undefined if callback is not provided', () => {
  // Act
  const actualReturnValue = itDoesSomethingElse();

  // Assert
  expect(actualReturnValue).toBeUndefined();
});
