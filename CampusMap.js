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
import { SvgCss, SvgXml } from 'react-native-svg';
import DeviceHeading from './DeviceHeading';


// iOSに位置情報権限を要求
if (Platform.OS == 'ios') {
    Geolocation.requestAuthorization("whenInUse");
}



const CampusMap: () => Node = () => {
    // スタイルに使う変数の定義
    const defaultWidth = 1400;
    const defaultHeight = 1500;
    const {width, height, scale} = Dimensions.get('window');
    const imageSource = './images/map_image.jpeg';
    const coord_icon = `<?xml version="1.0" encoding="UTF-8"?><svg id="_イヤー_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72.65 101.31"><defs><style>.cls-1{fill:url(#_エローグラデ);stroke:#231815;stroke-miterlimit:10;stroke-width:5px;}</style><linearGradient id="_エローグラデ" x1="21.77" y1="36.55" x2="70.47" y2="120.9" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset=".49" stop-color="#f2f2bd"/><stop offset=".5" stop-color="#f5c32b"/></linearGradient></defs><g id="_イヤー_1-2"><path class="cls-1" d="M25.41,7.54L6.03,30.32c-2.28,2.68-3.53,6.09-3.53,9.61v43.5c0,8.5,6.89,15.39,15.39,15.39H54.76c8.5,0,15.39-6.89,15.39-15.39V39.93c0-3.52-1.25-6.93-3.53-9.61L47.24,7.54C41.52,.82,31.13,.82,25.41,7.54Z"/></g></svg>`;
    const zoomin_icon = `<?xml version="1.0" encoding="UTF-8"?><svg id="_イヤー_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 108.94 108.94"><defs><style>.cls-1{fill:url(#_ンクグラデ);}.cls-1,.cls-2,.cls-3{stroke:#231815;stroke-miterlimit:10;stroke-width:5px;}.cls-2{fill:url(#_称未設定グラデーション_49-2);}.cls-3{fill:url(#_称未設定グラデーション_49);}</style><linearGradient id="_ンクグラデ" x1="41.46" y1="31.94" x2="93.86" y2="122.7" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset=".49" stop-color="#edbfd2"/><stop offset=".5" stop-color="#e388ad"/></linearGradient><linearGradient id="_称未設定グラデーション_49" x1="46.39" y1="40.32" x2="70.82" y2="82.62" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset=".49" stop-color="#f3c2d7"/><stop offset=".5" stop-color="#f2c0d5"/><stop offset=".5" stop-color="#f2b9d1"/><stop offset=".5" stop-color="#f1adca"/><stop offset=".5" stop-color="#f09cbf"/><stop offset=".5" stop-color="#ef8db6"/></linearGradient><linearGradient id="_称未設定グラデーション_49-2" x1="-347.45" y1="475.5" x2="-323.03" y2="517.8" gradientTransform="translate(-435.09 -284.81) rotate(-90)" xlink:href="#_称未設定グラデーション_49"/></defs><g id="_イヤー_1-2"><g><circle class="cls-1" cx="54.47" cy="54.47" r="51.97"/><g><line class="cls-3" x1="21.89" y1="54.47" x2="87.24" y2="54.47"/><line class="cls-2" x1="54.56" y1="87.15" x2="54.56" y2="21.79"/></g></g></g></svg>`;
    const zoomout_icon = `<?xml version="1.0" encoding="UTF-8"?><svg id="_イヤー_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 108.94 108.94"><defs><style>.cls-1{fill:url(#_称未設定グラデーション_49);}.cls-1,.cls-2{stroke:#231815;stroke-miterlimit:10;stroke-width:5px;}.cls-2{fill:url(#_ルーグラデ);}</style><linearGradient id="_ルーグラデ" x1="41.46" y1="31.94" x2="93.86" y2="122.7" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset=".49" stop-color="#a9d2e9"/><stop offset=".5" stop-color="#72bada"/></linearGradient><linearGradient id="_称未設定グラデーション_49" x1="46.39" y1="40.32" x2="70.82" y2="82.62" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset=".49" stop-color="#f3c2d7"/><stop offset=".5" stop-color="#f2c0d5"/><stop offset=".5" stop-color="#f2b9d1"/><stop offset=".5" stop-color="#f1adca"/><stop offset=".5" stop-color="#f09cbf"/><stop offset=".5" stop-color="#ef8db6"/></linearGradient></defs><g id="_イヤー_1-2"><g><circle class="cls-2" cx="54.47" cy="54.47" r="51.97"/><line class="cls-1" x1="21.89" y1="54.47" x2="87.24" y2="54.47"/></g></g></svg>`;
    const compass_icon = `<?xml version="1.0" encoding="UTF-8"?><svg id="_イヤー_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100.19 100.19"><defs><style>.cls-1{fill:url(#_ープルグラデ);stroke:#231815;stroke-miterlimit:10;stroke-width:5px;}</style><linearGradient id="_ープルグラデ" x1="38.19" y1="29.47" x2="86.17" y2="112.58" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" gradientUnits="userSpaceOnUse"><stop offset=".49" stop-color="#a9a4d0"/><stop offset=".5" stop-color="#7e78a3"/></linearGradient></defs><g id="_イヤー_1-2"><circle class="cls-1" cx="50.1" cy="50.1" r="47.6"/></g></svg>`;
    const compass_needle = `<?xml version="1.0" encoding="UTF-8"?><svg id="_イヤー_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.69 75.59"><defs><style>.cls-1{fill:#fff;}.cls-1,.cls-2{stroke:#231815;stroke-miterlimit:10;stroke-width:3px;}.cls-2{fill:#e61673;}</style></defs><g id="_イヤー_1-2"><g><polygon class="cls-2" points="11.34 5.41 1.99 37.8 20.69 37.8 11.34 5.41"/><polygon class="cls-1" points="11.34 70.18 20.69 37.8 1.99 37.8 11.34 70.18"/></g></g></svg>`;

    // 地図画像の表示用変数
    const [mapWidth, setMapWidth] = useState(defaultWidth);
    const [mapHeight, setMapHeight] = useState(defaultHeight);
    const [mapTopY, setMapTopY] = useState(-400);
    const [mapLeftX, setMapLeftX] = useState(-500);
    const [mapDeg, setMapDeg] = useState(0);
    const [mapScale, setMapScale] = useState(1.0);
    const [coordX, setCoordX] = useState(0.28); // 0.0-1.0
    const [coordY, setCoordY] = useState(0.66); // 0.0-1.0
    const [iconX, setIconX] = useState('43.5%');
    const [iconY, setIconY] = useState('77%');

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
            backgroundColor: '#dcf0ff',
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
            fontSize: 20 * mapScale,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            backgroundColor: '#ffffff77',
        },
        buildg_text_non_touch: {
            color: 'red',
            fontSize: 20 * mapScale,
            fontWeight: 'bold',
            backgroundColor: '#ffffff77',
        },
        modal_inside: {
            backgroundColor: '#ffffffee',
            margin: 20,
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
                    setCoordX( (longitude - 139.44910) / (139.45511 - 139.44910) );
                    setCoordY( 1.0 - (latitude - 35.32220) / (35.32749 - 35.32220) );
                    setIconX( (longitude - 139.44910) / (139.45511 - 139.44910) * 100 + "%" );
                    setIconY( (1.0 - (latitude - 35.32220) / (35.32749 - 35.32220)) * 100 + "%" );
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
                os.delay = 30
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
                    setMapDeg(265);
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
        if (mapScale < 1.4) {
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
                <View style={{position: 'absolute', top: iconY, left: iconX, width: 72.65 * 0.45, height: 101.31 * 0.45, transform: [{ rotate: deviceHeading + "deg" }]}}>
                    <SvgCss xml={coord_icon}/>
                </View>
                <TouchableOpacity style={{position: 'absolute', top: '44%', left: '79%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text_non_touch}>大学正門</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{position: 'absolute', top: '50%', left: '17%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text_non_touch}>(高校正門)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '41.3%', left: '70%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>本館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '33.5%', left: '52.3%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>1号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '25.4%', left: '52%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>2号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '65.5%', left: '55%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>3号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '73%', left: '51%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>4号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '74.3%', left: '34%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>5号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '72.5%', left: '24.2%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>6号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '58.8%', left: '23.5%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>7号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '60%', left: '30%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>8号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '58.8%', left: '37%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>9号館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '56%', left: '55%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>糸山英太郎記念</Text>
                    <Text style={styles.buildg_text}>教育センター</Text>
                    <Text style={styles.buildg_text}>（Ａ館）</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '64%', left: '46.5%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>佐々木記念</Text>
                    <Text style={styles.buildg_text}>体育会館</Text>
                    <Text style={styles.buildg_text}>(大学体育館)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '33.5%', left: '67%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>大講義室・</Text>
                    <Text style={styles.buildg_text}>付属図書館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '64%', left: '61%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>学生会館</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal} style={{position: 'absolute', top: '24.5%', left: '67%', transform: [{rotate: (mapDeg) + 'deg'}, {scale: 1/mapScale}]}}>
                    <Text style={styles.buildg_text}>大学会館</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ui_layer} pointerEvents='box-none'>
                <TouchableOpacity onPress={toggleHeading} style={{position: 'relative', top: height*0.70, left: width*0.85, width: 50, height:50}}>
                    <SvgCss xml={compass_icon}></SvgCss>
                    <View style={{width:50, height:50, top:-50, transform:[{rotate:-mapDeg + "deg"}]}}>
                        <SvgCss xml={compass_needle}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={mapZoomIn} style={{top: height*0.73, left: width*0.85, width: 50, height: 50}}>
                    <SvgCss xml={zoomin_icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={mapZoomOut} style={{top: height*0.75, left: width*0.85, width: 50, height: 50}}>
                    <SvgCss xml={zoomout_icon}/>
                </TouchableOpacity>
            </View>
        </View>

        <View>
            <TextInput style={{zIndex: 5, elevation: 5, position: 'absolute', borderRadius: 5, top: 30, left: width * 0.05, width: width * 0.9, color:'black', backgroundColor: 'white', fontSize: 24}} placeholder=" Search"></TextInput>
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
