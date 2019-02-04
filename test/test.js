describe('jest-expect-standalone library', () => {
  it('__jest_expect_version global property is defined', () => {
    expect(window.__jest_expect_version).toBeDefined();
  });

  it('__jest_expect_version global property is a string', () => {
    expect(window.__jest_expect_version).toEqual(expect.any(String));
  });

  it('expect global property is defined', () => {
    expect(window.expect).toBeDefined();
  });
});

describe('expect functionality', () => {
  describe('expect(value)', () => {
    const bestLaCroixFlavor = () => {
      return 'grapefruit';
    };

    it('the best flavor is grapefruit', () => {
      expect(bestLaCroixFlavor()).toBe('grapefruit');
    });

    it('true = false should fail', () => {
      expect(function () {
        expect(true).toEqual(false);
      }).toThrow();
    });
  });

  describe('expect.extend(matchers)', () => {
    beforeEach(() => {
      expect.extend({
        toBeWithinRange(received, floor, ceiling) {
          const pass = received >= floor && received <= ceiling;
          if (pass) {
            return {
              message: () =>
                `expected ${received} not to be within range ${floor} - ${ceiling}`,
              pass: true,
            };
          } else {
            return {
              message: () =>
                `expected ${received} to be within range ${floor} - ${ceiling}`,
              pass: false,
            };
          }
        },
      });
    });

    it('numeric ranges', () => {
      expect(100).toBeWithinRange(90, 110);
      expect(101).not.toBeWithinRange(0, 100);
      expect({apples: 6, bananas: 3}).toEqual({
        apples: expect.toBeWithinRange(1, 10),
        bananas: expect.not.toBeWithinRange(11, 20),
      });
    });
  });

  describe('Async Matchers', () => {
    const getExternalValueFromRemoteSource = () => {
      const promise = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(100);
        }, 10);
      });

      return promise;
    };

    beforeEach(() => {
      expect.extend({
        async toBeDivisibleByExternalValue(received) {
          const externalValue = await getExternalValueFromRemoteSource();
          const pass = received % externalValue == 0;
          if (pass) {
            return {
              message: () =>
                `expected ${received} not to be divisible by ${externalValue}`,
              pass: true,
            };
          } else {
            return {
              message: () =>
                `expected ${received} to be divisible by ${externalValue}`,
              pass: false,
            };
          }
        },
      });
    });

    it('is divisible by external value', async () => {
      await expect(100).toBeDivisibleByExternalValue();
      await expect(101).not.toBeDivisibleByExternalValue();
    });
  });

  describe('arrayContaining', () => {
    const expected = ['Alice', 'Bob'];

    it('matches even if received contains additional elements', () => {
      expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
    });

    it('does not match if received does not contain expected elements', () => {
      expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
    });
  });
});
