package com.example.dengshaomin.reactcontrols;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.json.JSONException;
import org.json.JSONObject;

import javax.annotation.Nullable;


/**
 * Created by dengshaomin on 2017/4/26.
 */

public class NativeButtonManager extends SimpleViewManager<View> {
    public static final String REACT_CLASS = "NativeButtonView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected View createViewInstance(final ThemedReactContext reactContext) {

        final View view = LayoutInflater.from(reactContext).inflate(R.layout.native_button, null);

        view.findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                WritableMap map = Arguments.createMap();
                try {
                    map.putString("nativebuttonclick", String.valueOf(new JSONObject("{id:123}")));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                // "topChange"事件在JS端映射到"onChange"，参考UIManagerModuleConstants.java
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(view.getId()
                        , "topChange", map);
            }
        });
        return view;
    }

    @ReactProp(name = "text")
    public void setText(View view, @Nullable String text) {
        ((Button) view.findViewById(R.id.button)).setText(text);
    }

    @ReactProp(name = "html")
    public void setHtml(View view, @Nullable String html) {
        Log.e("TAG", "setHtml");
//        view.loadData(html, "text/html; charset=utf-8", "UTF-8");
    }
}
