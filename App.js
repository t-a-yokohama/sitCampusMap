/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import CampusMap from './CampusMap';

const App: () => Node = () => {
    // Androidに位置情報権限を要求
    if (Platform.OS == "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }

    return (
        <SafeAreaView style={styles.container}>
            <CampusMap></CampusMap>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
