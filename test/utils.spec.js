import utils from '../lib/utils';

describe('utils', function () {

    it('should be defined', function () {
        expect(utils).toBeDefined();
    });

    describe ('methods', function ( ) {
        describe ('isObject', function () {
            it ('should be defined', function () {
                expect(utils.isObject).toBeDefined();
            });

            it ('should return true if a variable is an object', function () {
                var obj = {};
                expect(utils.isObject(obj)).toBe(true);
            });

            it ('should return false if a variable is not an object', function () {
                var notObj = 1;
                expect(utils.isObject(notObj)).toBe(false);
            });
        });

        describe ('deepExtend', function () {
            it ('should be defined', function () {
                expect(utils.deepExtend).toBeDefined();
            });

            it ('should recursively extend an object', function () {
                var objA = {
                    objB: {
                        name: 'B',
                        number: 3
                    }
                };

                var objAExtend = {
                    objB: {
                        number: 4,
                        color: 'green'
                    },
                    objC: {
                        name: 'C',
                        number: 23
                    }
                };
                utils.deepExtend(objA, objAExtend);

                expect(objA.objB.name).toBe('B');
                expect(objA.objB.color).toBe('green');
                expect(objA.objB.number).toBe(4);
                expect(objA.objC.number).toBe(23);
            });
        });

        describe ('uuid', function () {
            it ('should be defined', function () {
                expect(utils.uuid).toBeDefined();
            });

            it ('should return a valid uuid', function () {
                var uuid = utils.uuid();
                var reg = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

                expect(reg.test(uuid)).toBe(true);
            });
        });

        describe ('mils2Secs', function () {
            it ('should be defined', function() {
                expect(utils.mils2Secs).toBeDefined();
            });
        });

        describe ('mils2Mins', function () {
            it ('should be defined', function() {
                expect(utils.mils2Mins).toBeDefined();
            });
        });

        describe ('secs2Mils', function() {
            it ('should be defined', function() {
                expect(utils.secs2Mils).toBeDefined();
            });
        });

        describe ('mins2Mils', function() {
            it ('should be defined', function() {
                expect(utils.mins2Mils).toBeDefined();
            });
        });
    });
});
