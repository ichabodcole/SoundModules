import { NoiseTypes, ModuleEvents, ModuleStates, ColorNoiseModule } from '../../lib/index';
import { ControlEvents, OmniControl } from 'property-controls';

var audioContext = new AudioContext();

describe ('ColorNoiseModule', function() {
    var sm, options;

    beforeEach(function() {
        options = {
            volume: {
                min: 0,
                max: 1,
                value: 0.5
            }
        };
        sm = new ColorNoiseModule(audioContext, options);
        sm.start();
    });

    describe ('constructor', function() {
        it ('should not throw an error', function () {
            expect(function () {
                new ColorNoiseModule(audioContext, options);
            }).not.toThrow();
        });

        it ('should set up default values if provided', function () {
            options.volume.value = 0.5;
            var sm = new ColorNoiseModule(audioContext, options);
            expect(sm.type).toBe('color-noise-module');
            expect(sm.volume.value).toBe(0.5);
        });
    });

    describe ('properties', function () {

        describe ('type', function () {
            it ('should return a type string', function () {
                expect(sm.type).toEqual('color-noise-module');
            });
        });

        describe ('gain', function () {
            it ('should return the gain value as number', function () {
                sm.gain = 1;
                expect(sm.gain).toEqual(1);
            });

            it ('should set the gain property', function () {
                sm.gain = 0;
                expect(sm.gain).toEqual(0);
            })
        });

        describe ('mute', function () {
            it ('should return a boolean with a default value of false', function () {
                expect(sm.mute).toEqual(false);
            });

            it ('should set the models muted value', function() {
                sm.mute = true;
                expect(sm.mute).toEqual(true);
            });

            it ('should set the gain property to 0 when true', function () {
                sm.gain = 1;
                expect(sm.gain).toEqual(1);

                sm.mute = true;
                expect(sm.gain).toEqual(0);
            });

            it ('it should set the gain property to the volume controls value when set from true to false', function () {
                sm.mute = true;
                expect(sm.gain).toEqual(0);
                sm.mute = false;
                expect(sm.gain).toEqual(0.5);
            });
        });

        describe ('volume', function () {
            it ('should be defined', function () {
                expect(sm.volume).toBeDefined();
            });

            it ('should update the gain value', function() {
                sm.volume.value = 0.75;
                expect(sm.gain).toEqual(0.75);
            });

            it ('should not update the gain value if the sound module is muted', function() {
                sm.mute = true;
                sm.volume.value = 0.25;
                expect(sm.gain).toEqual(0);
            });
        });

        describe ('noiseType', function () {
            it ('should be defined', function() {
                expect(sm.noiseType).toBeDefined();
            });

            it ('should return the generators noise type', function() {
                sm.generator.noiseType = NoiseTypes.PINK_NOISE;
                expect(sm.noiseType).toEqual('pink');
            });

            it ('should set the generators noise type', function() {
                sm.noiseType = NoiseTypes.WHITE_NOISE;
                expect(sm.generator.noiseType).toEqual('white');
            });
        });
    });

    describe ('methods', function () {

        describe ('start', function() {
            it('should call the generators start method', function() {
                spyOn(sm.generator, 'start');
                sm.start();
                expect(sm.generator.start).toHaveBeenCalled();
            });

            it('should set the state property to ACTIVE', function() {
                sm.start();
                expect(sm.state).not.toBe(undefined);
                expect(sm.state).toBe(ModuleStates.ACTIVE);
            });
        });

        describe ('stop', function() {
            it('should call the generators stop method', function() {
                spyOn(sm.generator, 'stop');
                sm.stop();
                expect(sm.generator.stop).toHaveBeenCalled();
            });

            it('should set the state property to STOPPED', function() {
                sm.stop();
                expect(sm.state).not.toBe(undefined);
                expect(sm.state).toBe(ModuleStates.STOPPED);
            });
        });

        describe ('connect', function () {
            it ('should call the connect method of the gainNode', function () {
                spyOn(sm.gainNode, 'connect');
                sm.connect({});
                expect(sm.gainNode.connect).toHaveBeenCalled();
            });

            it('should emit a CONNECT event', function() {
                /**
                * TODO: consider mocking the audioCtx for testing.
                */
                var gainNode = sm.audioCtx.createGain();
                spyOn(sm,'emit');
                sm.connect(gainNode);
                expect(sm.emit).toHaveBeenCalledWith(ModuleEvents.CONNECT);
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
                expect(sm.emit).toHaveBeenCalledWith(ModuleEvents.DISCONNECT);
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
                expect(sm.emit).toHaveBeenCalledWith(ModuleEvents.DESTROY);
            });
        });
    });
});
