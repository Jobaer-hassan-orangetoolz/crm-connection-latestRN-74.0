package com.crmconnection.permission

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class PermissionPackager: ReactPackage{
    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        val modules:MutableList<NativeModule> = ArrayList()
        modules.add(PermissionModule(reactContext))
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<View, ReactShadowNode<*>>> {
        return emptyList()
    }

}