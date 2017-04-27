package com.example.dengshaomin.reactcontrols;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;


/**
 * Created by dengshaomin on 2017/4/26.
 */

public class NativeWebViewManager extends SimpleViewManager<WebView> {

    public static final String REACT_CLASS = "NativeWebView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        WebView webView = new WebView(reactContext);
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        return webView;
    }

    @ReactProp(name = "url")
    public void setUrl(WebView view, @Nullable String url) {
        Log.e("TAG", "setUrl");
        view.loadUrl(url);
    }

    @ReactProp(name = "html")
    public void setHtml(WebView view, @Nullable String html) {
        Log.e("TAG", "setHtml");
        view.loadData(html, "text/html; charset=utf-8", "UTF-8");
    }
}
