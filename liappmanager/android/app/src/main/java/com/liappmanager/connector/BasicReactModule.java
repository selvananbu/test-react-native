package com.liappmanager.connector;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BasicReactModule extends ReactContextBaseJavaModule {

    public BasicReactModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName() {
        return "BasicExample";
    }

    @ReactMethod
    public  void writeKeyValueItem(String key,String value){
        SharedPreferences prefs = getCurrentActivity().getSharedPreferences("maindb",
                getReactApplicationContext().MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(key,value);
        editor.commit();


    }
    @ReactMethod
    public  void writeKeyValueInteger(String key,Integer value){

        SharedPreferences prefs = getCurrentActivity().getSharedPreferences("maindb",
                getReactApplicationContext().MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putInt(key,value);
        editor.commit();


    }
    @ReactMethod
    public  void writeKeyValueBoolean(String key,Boolean value){

        SharedPreferences prefs = getCurrentActivity().getSharedPreferences("maindb",
                getReactApplicationContext().MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putBoolean(key,value);
        editor.commit();


    }
}
