package com.sitcampusmap

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry
import androidx.lifecycle.Observer
import com.facebook.react.bridge.*

class DeviceHeading(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "DeviceHeading"

    @ReactMethod(isBlockingSynchronousMethod = true)

    private val myLifecycleOwner = MyLifecycleOwner()

    @ReactMethod
    fun stop(reactContext: ReactApplicationContext) {
        myLifecycleOwner.stop()
    }

    @ReactMethod
    fun watchHeading(callback: Callback, reactContext: ReactApplicationContext) {
        myLifecycleOwner.start()

        SensorLiveData(reactApplicationContext).observe(myLifecycleOwner, Observer<Double> { azimuth: Double ->
            callback.invoke(azimuth)
        })
    }
}


class MyLifecycleOwner : LifecycleOwner {
    private val lifecycleRegistry = LifecycleRegistry(this)

    override fun getLifecycle() = lifecycleRegistry

    fun start() {
        lifecycleRegistry.currentState = Lifecycle.State.STARTED
    }

    fun stop() {
        lifecycleRegistry.currentState = Lifecycle.State.CREATED
    }
}
