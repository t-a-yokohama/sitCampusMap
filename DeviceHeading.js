import { NativeModules } from "react-native";

const { RNHeadingModule } = NativeModules;

const DeviceHeading = {

    watchHeading: (callback, delay=500) => {
        RNHeadingModule.start();
        var azimuth;

        const id = setInterval(() => {
            RNHeadingModule.getHeading(deg => {
                azimuth = deg;
            });
            callback(azimuth);
        }, delay);
        return id;
    },

    stop: (id) => {
        clearInterval(id);
        RNHeadingModule.stop();
    }
};

export default DeviceHeading;