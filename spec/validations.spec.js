const {
    number,
    isNot,
    alpha,
    email
} = require('../src');

describe('A suit of commons form validation functions', () => {
    describe('email function', () => {
        it('Is a valid email', () => {
            expect(email('very.common@example.com')).toBe(true);
            expect(email('disposable.style.email.with + symbol@example.com')).toBe(true);
            expect(email('other.email -with-hyphen@example.com')).toBe(true);
            expect(email('fully - qualified - domain@example.com')).toBe(true);
            expect(email('user.name + tag + sorting@example.com')).toBe(true);
            expect(email('x@example.com')).toBe(true);
            expect(email('"very.(),:;<>[]\\".VERY.\"very@\\ \"very\".unusual"@strange.example.com')).toBe(true);
            expect(email('example - indeed@strange-example.com')).toBe(true);
            expect(email('admin@mailserver1')).toBe(true);
            expect(email('#!$ %& \'*+-/=?^_`{}|~@example.org')).toBe(true);
            expect(email('simple@example.com')).toBe(true);
            expect(email('" "@example.org')).toBe(true);
            expect(email('user@[2001:DB8::1]')).toBe(true);
            expect(email('example@s.example')).toBe(true);
        });

        it('Is not a valid email', () => {
            expect(isNot(email('Abc.example.com'))).toBe(true);
            expect(isNot(email('A@b@c@example.com'))).toBe(true);
            expect(isNot(email('a"b(c)d,e:f;g<h>i[j\k]l@example.com'))).toBe(true);
            expect(isNot(email('just"not"right@example.com'))).toBe(true);
            expect(isNot(email('this is"not\allowed@example.com'))).toBe(true);
            expect(isNot(email('this\ still\"not\\allowed@example.com'))).toBe(true);
            expect(isNot(email('1234567890123456789012345678901234567890123456789012345678901234+x@example.com'))).toBe(true);
            expect(isNot(email('john..doe@example.com'))).toBe(true);
            expect(isNot(email('john.doe@example..com'))).toBe(true);
        });

    });

    describe('alpha function', () => {
        it('Allows only letters', () => {
            expect(alpha('hola')).toBe(true);
            expect(alpha('John Doe')).toBe(true);
            expect(alpha('John Doe día')).toBe(true);
            expect(alpha('John Doe Ño')).toBe(true);

        });

        it('Is not Allows only letters', () => {
            expect(isNot(alpha('John Doe234'))).toBe(true);
            expect(isNot(alpha('123John Doe234'))).toBe(true);
            expect(isNot(alpha('123234'))).toBe(true);
            expect(isNot(alpha(123234))).toBe(true);
        });
    });

    describe('number function', () => {
        it('Allows only numbers', () => {
            expect(number('2')).toBe(true);
            expect(number(2)).toBe(true);
            expect(number(2, true)).toBe(true);
            expect(number('1234')).toBe(true);
        });

        it('Is not Allows only numbers', () => {
            expect(isNot(alpha('John Doe234'))).toBe(true);
            expect(isNot(alpha('123John Doe234'))).toBe(true);
            expect(isNot(alpha('123234', true))).toBe(true);
            expect(isNot(alpha(123234, false))).toBe(true);
        });
    });
});
