package com.example.dengshaomin.reactcontrols;

import android.app.Application;
import android.os.Environment;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;


/**
 * Created by dengshaomin on 2016/12/20.
 */
public class MyApplication extends Application implements ReactApplication {

    private String bundle = Environment.getExternalStorageDirectory().toString() + File.separator + "patches/";
    private String bundleName = "index.android.bundle";
    private String zipName = "pack.zip";

    @Override
    public void onCreate() {
        super.onCreate();


    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
//                    new RNSpinkitPackage()
            );
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            return super.getJSBundleFile();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

}
