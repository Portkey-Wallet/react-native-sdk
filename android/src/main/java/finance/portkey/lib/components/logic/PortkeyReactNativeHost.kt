package finance.portkey.lib.components.logic

import android.app.Application
import com.facebook.hermes.reactexecutor.HermesExecutorFactory
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import finance.portkey.lib.PortkeyNativePackages

var hostInstance: PortkeyReactNativeHost? = null

class PortkeyReactNativeHost(
    application: Application, private val isDebug: Boolean = false
) : ReactNativeHost(application) {

    init {
        hostInstance = this
    }

    override fun getUseDeveloperSupport(): Boolean = isDebug
    override fun getPackages(): MutableList<ReactPackage> {
        return mutableListOf(PortkeyNativePackages())
    }

    override fun getJSMainModuleName(): String {
        return "index"
    }

    override fun getBundleAssetName(): String {
        return "index.android.bundle"
    }

    override fun getJavaScriptExecutorFactory() = HermesExecutorFactory()

}
