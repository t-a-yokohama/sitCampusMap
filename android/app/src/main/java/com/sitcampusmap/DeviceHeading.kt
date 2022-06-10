package com.sitcampusmap
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LifecycleRegistry
import androidx.lifecycle.Observer
import com.facebook.react.bridge.*

class DeviceHeading(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, LifecycleOwner {
    override fun getName(): String = "DeviceHeading"

    private lateinit var lifecycleRegistry: LifecycleRegistry

    init {
        reactContext.addLifecycleEventListener(this)
        lifecycleRegistry = LifecycleRegistry(this)
        lifecycleRegistry.currentState = Lifecycle.State.CREATED
    }

    override fun getLifecycle() = lifecycleRegistry

    override fun onHostDestroy() {
        lifecycleRegistry.currentState = Lifecycle.State.DESTROYED
    }

    override fun onHostResume() {
        lifecycleRegistry.currentState = Lifecycle.State.RESUMED
    }

    override fun onHostPause() {
        lifecycleRegistry.handleLifecycleEvent(Lifecycle.Event.ON_PAUSE)
    }


    @ReactMethod
    fun stop(reactContext: ReactApplicationContext) {
        lifecycleRegistry.currentState = Lifecycle.State.DESTROYED
    }

    @ReactMethod
    fun watchHeading(callback: Callback, reactContext: ReactApplicationContext) {
        lifecycleRegistry.currentState = Lifecycle.State.STARTED

        SensorLiveData(reactApplicationContext).observe(this, Observer<Double> { azimuth: Double ->
            callback.invoke(azimuth)
        })
    }


}
