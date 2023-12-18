package finance.portkey.lib

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import finance.portkey.core.PortKeySDKHolder

open class PortkeyReactApplication : Application(), ReactApplication {
    override fun onCreate() {
        super.onCreate()
        PortKeySDKHolder.initialize(this)
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return PortKeySDKHolder.obtainNavHost(this)
    }

}
