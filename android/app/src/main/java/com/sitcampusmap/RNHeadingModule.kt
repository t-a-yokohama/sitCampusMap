package com.sitcampusmap

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import com.facebook.react.bridge.*

class RNHeadingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), SensorEventListener {
    override fun getName(): String = "RNHeadingModule"


    private val sensorManager: SensorManager = reactApplicationContext.applicationContext.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private val accelerometer: Sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
    private val magnetometer: Sensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD)

    private var accelerometerReading = FloatArray(3)
    private var magnetometerReading = FloatArray(3)

    private val rotationMatrix = FloatArray(9)
    private val orientationAngles = FloatArray(3)

    private var azimuth: Double = 0.0

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // Do nothing.
    }

    override fun onSensorChanged(event: SensorEvent?) {
        // センサの値を格納
        when (event?.sensor) {
            accelerometer -> { accelerometerReading = event.values }
            magnetometer -> { magnetometerReading = event.values }
        }

        // 端末の回転向きを計算
        SensorManager.getRotationMatrix(rotationMatrix, null, accelerometerReading, magnetometerReading)
        SensorManager.getOrientation(rotationMatrix, orientationAngles)

        // ラジアンを度に変更し、取得値をプラスの範囲に修正
        val rad = orientationAngles[0].toDouble()
        val degree = rad * 180 / Math.PI
        val azimuth = if (degree >= 0) {
            degree
        } else {
            degree + 360
        }

        this.azimuth = azimuth
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun start() {
        sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
        sensorManager.registerListener(this, magnetometer, SensorManager.SENSOR_DELAY_NORMAL)
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun stop() {
        sensorManager.unregisterListener(this)
    }

    @ReactMethod
    fun getHeading(callback: Callback) {
        callback.invoke(azimuth)
    }
}
