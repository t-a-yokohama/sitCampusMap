import { NativeModules } from "react-native";

const { RNHeadingModule } = NativeModules;

const DeviceHeading = {

    watchHeading: (callback) => {
        RNHeadingModule.start();
        var azimuth

        const id = setInterval(() => {
            RNHeadingModule.getHeading(deg => {
                azimuth = deg;
            });
            callback(azimuth);
        }, 250);
        return id;
    },

    stop: (id) => {
        clearInterval(id);
        RNHeadingModule.stop();
    }
};

export default DeviceHeading;