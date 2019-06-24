// const {
//     moreThan,
//     lessThan,
//     equal,
//     isNot,
//     is
// } = require('../src');


// describe('A set of sematic conditionals', () => {
//     it('is must return true for any truthty value', () => {
//         expect(is(true)).toBe(true);
//         expect(is('hola')).toBe(true);
//         expect(is({})).toBe(true);
//         expect(is([])).toBe(true);
//         expect(is(1)).toBe(true);
//         expect(is(-1)).toBe(true);
//     });

//     it('isNot must return true for any falsy value', () => {
//         expect(isNot(false)).toBe(true);
//         expect(isNot('')).toBe(true);
//         expect(isNot(0)).toBe(true);
//         expect(isNot(null)).toBe(true);
//         expect(isNot(undefined)).toBe(true);
//     });

//     it('Check if a number is less than another number', () => {
//         expect(lessThan(5, 10)).toBe(true);
//         expect(lessThan(50, 10)).toBe(false);
//     });

//     it('Check if a number is more than another number', () => {
//         expect(moreThan(5, 10)).toBe(false);
//         expect(moreThan(50, 10)).toBe(true);
//     });

//     it('Check if a value is equal to antoher', () => {
//         expect(equal(5, 10)).toBe(false);
//         expect(equal(50, 50)).toBe(true);
//         expect(equal('hola', 'hola')).toBe(true);
//         expect(equal('hola', 'jola')).toBe(false);
//         expect(equal(null, undefined)).toBe(false);
//         expect(equal(isNot(null), isNot(undefined))).toBe(true);
//     });


// });
