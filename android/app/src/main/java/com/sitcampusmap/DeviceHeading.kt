package com.sitcampusmap
import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry
import androidx.lifecycle.LiveData
import androidx.lifecycle.Observer
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceHeading(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleOwner {
    override fun getName(): String = "DeviceHeading"

    private val lifecycleRegistry = LifecycleRegistry(this)
    override fun getLifecycle() = lifecycleRegistry


    @ReactMethod
    fun stop() {
        lifecycleRegistry.currentState = Lifecycle.State.RESUMED
    }


    @ReactMethod
    fun watchHeading(callback: Callback) {
        lifecycleRegistry.currentState = Lifecycle.State.STARTED

        SensorLiveData(reactApplicationContext).observe(this, Observer<Double> { azimuth: Double ->
            callback.invoke(azimuth)
        })
    }
}
