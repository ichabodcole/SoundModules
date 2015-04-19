import { SoundModule, SoundModuleEvent } from '../../lib/modules/sound-module';

describe ('SoundModule', function () {
    var sm, options, audioContext;

    beforeEach (function () {
        audioContext = {
            createGain: function () {
                return {
                    gain: {
                        value: 1
                    },
                    connect: function(node) { return true },
                    disconnect: function() {}
                };
            }
        };
        options = {
            // type: 'sound-module',
            volume: {
                min: 0,
                max: 1,
                value: 0.5
            }
        };

        sm = new SoundModule(audioContext, options);
        sm.start();
    });

    it ('should be defined', function () {
        expect(SoundModule).toBeDefined();
    });

    describe ('constructor', function () {
        it ('should not throw an error', function () {
            expect(function () {
                new SoundModule(audioContext, options);
            }).not.toThrow();
        });

        it ('should set up default values if provided', function () {
            options.volume.value = 0.5;
            sm = new SoundModule(audioContext, options);
            expect(sm.volume.value).toBe(0.5);
            expect(sm.type).toBe('sound-module');
        });
    });

    describe ('properties', function () {

        describe ('type', function () {
            it ('should return a type string', function () {
                expect(sm.type).toEqual('sound-module');
            });
        });

        describe ('gain', function () {
            it ('should return the gain value as number', function () {
                sm.gain = 1;
                expect(sm.gain).toBe(1);
            });

            it ('should set the gain property', function () {
                sm.gain = 0;
                expect(sm.gain).toBe(0);
            })
        });

        describe ('mute', function () {
            it ('should return a boolean with a default value of false', function () {
                expect(sm.mute).toBe(false);
            });

            it ('should set the models muted value', function() {
                sm.mute = true;
                expect(sm.mute).toBe(true);
            });

            it ('should set the gain property to 0 when true', function () {
                sm.gain = 1;
                expect(sm.gain).toBe(1);

                sm.mute = true;
                expect(sm.gain).toBe(0);
            });

            it ('it should set the gain property to the volume controls value when set from true to false', function () {
                sm.mute = true;
                expect(sm.gain).toBe(0);
                sm.mute = false;
                expect(sm.gain).toBe(0.5);
            });
        });

        describe ('volume', function () {
            it ('should be defined', function () {
                expect(sm.volume).toBeDefined();
            });

            it ('should update the gain value', function() {
                sm.volume.value = 0.75;
                expect(sm.gain).toBe(0.75);
            });

            it ('should not update the gain value if the sound module is muted', function() {
                sm.mute = true;
                sm.volume.value = 0.25;
                expect(sm.gain).toBe(0);
            });
        });
    });

    describe ('methods', function () {

        describe ('start', function() {
            it('should emit a START event', function() {
                spyOn(sm,'emit');
                sm.start();
                expect(sm.emit).toHaveBeenCalledWith(SoundModuleEvent.START);
            });

            it('should set the state property to ACTIVE', function() {
                sm.start();
                expect(sm.state).not.toBe(undefined);
                expect(sm.state).toBe(SoundModule.ACTIVE);
            });
        });

        describe ('stop', function() {
            it('should emit a STOP event', function() {
                spyOn(sm,'emit');
                sm.stop();
                expect(sm.emit).toHaveBeenCalledWith(SoundModuleEvent.STOP);
            });

            it('should set the state property to STOPPED', function() {
                sm.stop();
                expect(sm.state).not.toBe(undefined);
                expect(sm.state).toBe(SoundModule.STOPPED);
            });
        });

        describe ('connect', function () {
            it ('should call the connect method of the gainNode', function () {
                spyOn(sm.gainNode, 'connect');
                sm.connect({});
                expect(sm.gainNode.connect).toHaveBeenCalled();
            });

            it('should emit a CONNECT event', function() {
                spyOn(sm,'emit');
                sm.connect({});
                expect(sm.emit).toHaveBeenCalledWith(SoundModuleEvent.CONNECT);
            });
        });

        describe ('disconnect', function() {
            it ('should call the gainNodes disconnect method', function() {
                spyOn(sm.gainNode, 'disconnect');
                sm.disconnect();
                expect(sm.gainNode.disconnect).toHaveBeenCalled();
            });

            it('should emit a DISCONNECT event', function() {
                spyOn(sm,'emit');
                sm.disconnect();
                expect(sm.emit).toHaveBeenCalledWith(SoundModuleEvent.DISCONNECT);
            });
        });

        describe ('destroy', function () {
            it ('should be defined', function () {
                expect(sm.destroy).toBeDefined();
            });

            it ('should call the stop method', function() {
                spyOn(sm, 'stop');
                sm.destroy();
                expect(sm.stop).toHaveBeenCalled();
            });

            it ('should call the disconnect method', function() {
                spyOn(sm, 'disconnect');
                sm.destroy();
                expect(sm.disconnect).toHaveBeenCalled();
            });

            it('should emit a DESTROY event', function() {
                spyOn(sm,'emit');
                sm.destroy();
                expect(sm.emit).toHaveBeenCalledWith(SoundModuleEvent.DESTROY);
            });
        });
    });
});
