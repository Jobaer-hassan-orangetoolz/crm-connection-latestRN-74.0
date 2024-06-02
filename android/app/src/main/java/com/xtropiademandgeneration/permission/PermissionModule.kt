package com.xtropiademandgeneration.permission

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.widget.Toast
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import com.twiliovoicereactnative.VoiceActivityProxy

class PermissionModule(reactContext: ReactApplicationContext):ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "PermissionModule"
    }

    @ReactMethod
    fun requestPermissions(callback: Callback) {
        val activity = reactApplicationContext.current Activity
        if (activity != null) {
            val activityProxy = VoiceActivityProxy(activity) { permission ->
                when (permission) {
                    Manifest.permission.RECORD_AUDIO -> Toast.makeText(
                        activity,
                        "Microphone permissions needed. Please allow in your application settings.",
                        Toast.LENGTH_LONG
                    ).show()
                    Manifest.permission.POST_NOTIFICATIONS ->
                        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.S_V2) {
                            Toast.makeText(
                                activity,
                                "Notification permissions needed. Please allow in your application settings.",
                                Toast.LENGTH_LONG
                            ).show()
                        }
                }
            }

//            val permissions = arrayOf(
//                Manifest.permission.RECORD_AUDIO,
//                Manifest.permission.BLUETOOTH_CONNECT,
//                Manifest.permission.POST_NOTIFICATIONS
//            )
//            val grantedPermissions = permissions.filter {
//                activityProxy.checkPermission(it)
//            }
//            val deniedPermissions = permissions.filterNot {
//                activityProxy.checkPermission(it)
//            }

//            if (deniedPermissions.isNotEmpty()) {
//                activityProxy.requestPermissions(deniedPermissions.toTypedArray()) { result ->
//                    val allGranted = result.all { it.value }
//                    callback.invoke(allGranted)
//                }
//            } else {
//                callback.invoke(true)
//            }
            callback.invoke("true");
        } else {
            callback.invoke("false")
        }
    }
}

