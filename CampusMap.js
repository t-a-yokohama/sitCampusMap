import React, { useState , useEffect } from 'react';
import type {Node} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import DeviceHeading from './DeviceHeading';


// iOSに位置情報権限を要求
if (Platform.OS == 'ios') {
    Geolocation.requestAuthorization("whenInUse");
}



const CampusMap: () => Node = () => {
    // スタイルに使う変数の定義
    const defaultWidth = 1080;
    const defaultHeight = 960;
    const {width, height, scale} = Dimensions.get('window');
    const imageSource = './images/gas.jpg';

    // 地図画像の表示用変数
    const [mapWidth, setMapWidth] = useState(defaultWidth);
    const [mapHeight, setMapHeight] = useState(defaultHeight);
    const [mapTopY, setMapTopY] = useState(0);
    const [mapLeftX, setMapLeftX] = useState(0);
    const [mapDeg, setMapDeg] = useState(0);
    const [mapScale, setMapScale] = useState(1.0);

    // タッチ操作の直前位置記憶用
    const [prevPointX1, setPrevPointX1] = useState();
    const [prevPointY1, setPrevPointY1] = useState();
    const [prevPointX2, setPrevPointX2] = useState();
    const [prevPointY2, setPrevPointY2] = useState();


    // 方角固定のモード保存用
    const [mapHeading, setMapHeading] = useState('west');

    // 方角取得時の格納用
    const [deviceHeading, setDeviceHeading] = useState(0);

    // モーダルの表示・非表示切り替え
    const [modalVisible, setModalVisible] = useState(false);

    const modal = React.createRef();

    

    // スタイルの定義
    const styles = StyleSheet.create({
        whole_wrapper: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '200%',
            width: '200%',
            backgroundColor: '#444444',
        },
        map_layer: {
            position: 'absolute',
            top: mapTopY,
            left: mapLeftX,
            height: mapHeight,
            width: mapWidth,
            transform: [{ rotate: -mapDeg + "deg" },
                        { scale: mapScale},
                        ],
        },
        ui_layer: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: height,
            width: width,
        },
        buildg_text: {
            color: 'red',
            fontSize: 20,
            fontWeight: 'bold',
        },
        modal_inside: {
            backgroundColor: '#ffffffdd',
            margin: 30,
            borderRadius: 40,
        },
        modal_safety: {
            marginTop: 40,
            marginLeft: 20,
            marginRight: 20,
        }
    });

    // 詳細な位置情報を取得(Android:500ms)
    useEffect(
        () => {
            const WatchID = Geolocation.watchPosition(
                position => {
                    const {latitude, longitude} = position.coords;

                    // console.log(latitude+' '+longitude);
                },
                error => {
                    console.log(error.code+' '+error.message);
                },
                {
                    enableHighAccuracy: true,
                    distanceFilter: 0,
                    forceRequestLocation: true,
                    interval: 500,
                    fastestInterval: 500,
                }
            );

            return () => {
                if (WatchID) {
                    Geolocation.clearWatch(WatchID);
                }
            }
        },
        []
    );

    // 方位角をモジュールから取得
    useEffect(
        () => {
            const os = {};
            if (Platform.OS == 'android') {
                os.delay = 500
            }
            else if (Platform.OS == 'ios') {
                os.delay = 20
            }

            const watchId =  DeviceHeading.watchHeading(
                azimuth => {
                    if (azimuth != null) setDeviceHeading(azimuth);
                },
                os.delay
            );

            return () => {
                DeviceHeading.stop(watchId);
            }
        },
        []
    );


    // 方位角が更新されたらマップに反映させる処理
    useEffect(
        () => {
            switch (mapHeading) {
                case 'west':
                    setMapDeg(270);
                    break;
                case 'north':
                    setMapDeg(0);
                    break;
                case 'around':
                    setMapDeg(deviceHeading);
                    break;
            }
        },
        [deviceHeading,mapHeading]
    );

    // マップへのタッチが始まったときの動作
    const touchInit = (e) => {
        e.preventDefault();
        const touchList = e.nativeEvent.touches;
        if (touchList.length == 1) setPrevOnePoint(touchList) ;
        else {
            // マルチタッチ非対応
        }
    };

    // マップ上をドラッグしているときの動作
    const mapTrans = (e) => {
        e.preventDefault();
        const touchList = e.nativeEvent.touches;
        if (touchList.length == 1) {
            mapMove(touchList);
            setPrevOnePoint(touchList);
        }
        else {
            // マルチタッチ非対応
        }
    };

    // タッチされた位置の記録・更新
    const setPrevOnePoint = (touchList) => {
        if (touchList[0].identifier == 0) {
            setPrevPointX1(touchList[0].pageX);
            setPrevPointY1(touchList[0].pageY);
        }
        else {
            setPrevPointX2(touchList[0].pageX);
            setPrevPointY2(touchList[0].pageY);
        }
    };

    // マップ拡大動作
    const mapZoomIn = () => {
        if (mapScale < 1.8) {
            setMapScale(mapScale + 0.2);
        }
    };

    // マップ縮小動作
    const mapZoomOut = () => {
        if (mapScale > 0.6) {
            setMapScale(mapScale - 0.2);
        }
    };

    // マップ位置のドラッグ移動
    const mapMove = (touchList) => {
        const Moved = {x: 0, y: 0};

        if (touchList[0].identifier == 0) {
            Moved.x = touchList[0].pageX - prevPointX1;
            Moved.y = touchList[0].pageY - prevPointY1;
        }
        else {
            Moved.x = touchList[0].pageX - prevPointX2;
            Moved.y = touchList[0].pageY - prevPointY2;
        }

        setMapLeftX(mapLeftX + Moved.x);
        setMapTopY(mapTopY + Moved.y);
    };

    // マップの回転固定切り替え
    const toggleHeading = () => {
        switch (mapHeading) {
            case 'west':
                setMapHeading('north');
                break;
            case 'north':
                setMapHeading('around');
                break;
            case 'around':
                setMapHeading('west');
                break;
        }
    }

    // モーダルの表示・非表示切り替え
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };


    return (
        <>
        <View style={styles.whole_wrapper} onTouchStart={touchInit} onTouchMove={mapTrans}>
            <Image source={require(imageSource)} style={styles.map_layer}></Image>
            <View style={styles.map_layer} pointerEvents='box-none'>
                <View style={{flex: 1}}>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '10%', left: '20%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>本館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '25%', left: '8%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>糸山英太郎記念教育センター</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ui_layer} pointerEvents='box-none'>
                <TouchableOpacity onPress={toggleHeading} style={{top: height*0.70, left: width*0.85, width: 40, backgroundColor: "white"}}>
                    <Text style={{fontSize: 40}}>＊</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={mapZoomIn} style={{top: height*0.73, left: width*0.85, width: 40, backgroundColor: "white"}}>
                    <Text style={{fontSize: 40}}>＋</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={mapZoomOut} style={{top: height*0.75, left: width*0.85, width: 40, backgroundColor: "white"}}>
                    <Text style={{fontSize: 40}}>ー</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View>
            <TextInput style={{zIndex: 5, elevation: 5, position: 'absolute', borderRadius: 5, top: 30, left: width * 0.05, width: width * 0.9, backgroundColor: 'white', fontSize: 24}} placeholder=" Search"></TextInput>
        </View>

        <Modal isVisible={modalVisible} animationIn="fadeIn" animationOut="fadeOut" onBackButtonPress={toggleModal} onBackdropPress={toggleModal}>
            <TouchableOpacity onPress={toggleModal} style={{zIndex: 10, elevation: 10, position: 'absolute', top: 40, left: (width - 120), width: 40,}}>
                <Text style={{fontSize: 40,}}>×</Text>
            </TouchableOpacity>
            <ScrollView ref={modal} style={styles.modal_inside}>
                <View style={styles.modal_safety}>
                    <Text>Hello World !</Text>
                </View>
            </ScrollView>
        </Modal>
        </>
    );
};

export default CampusMap;