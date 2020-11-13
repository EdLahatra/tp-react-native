package com.ghanty.mobile;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.os.AsyncTask;
import android.os.SystemClock;
import android.widget.Toast;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Scanner;

public class ToastModule extends ReactContextBaseJavaModule {
    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter;
    //constructor
    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // this.emitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        // this.emitter = reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);

    }
    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "ToastModule";
    }
    //Custom function that we are going to export to JS
    @ReactMethod
    public void showToast(String path) throws FileNotFoundException {
        InputStream fs;
        fs = new FileInputStream(new File(path));
        Scanner scanner = new Scanner(fs);

        //reading file line by line using Scanner in Java
        System.out.println("Reading file line by line in Java using Scanner");

        while(scanner.hasNextLine()){
            System.out.println(scanner.nextLine());
        }

        scanner.close();
        Toast.makeText(getReactApplicationContext(), path, Toast.LENGTH_SHORT).show();
    }

    // private void emitStreamEvent(String streamName, String event, WritableArray data) {
    // private void emitStreamEvent(String name, String data) {
       // getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(name, data);
    // }

    private void emitStreamEvent(String streamName, String event, String message) {
        WritableMap eventData = Arguments.createMap();
        eventData.putString("event", event);
        // eventData.putString("code", code);
        eventData.putString("detail", message);
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(streamName, eventData);
        // this.emitter.emit(streamName, eventData);
    }

    @ReactMethod
    public void readStream(String path, String streamId, final Promise promise) {
        ReadFileTask task = new ReadFileTask(new ReadFileTask.Listener() {
            @Override
            public void onRead(String line) {
                emitStreamEvent(streamId, "data", line);
            }
            @Override
            public void onFinish(String message) {
                promise.resolve(1);
            }

            @Override
            public void onError(String message) {
                emitStreamEvent(streamId, "end",  message);
                promise.reject("FIN", message);
            }
        });
        task.execute(path);



        /*try {
            String p  = "/storage/emulated/0/Download" + "/temp/articles3.csv";

            InputStream fs;
            // fs = new FileInputStream(new File(path));
            fs = new FileInputStream(new File(p));
            Scanner scanner = new Scanner(fs, "UTF-8");

            //reading file line by line using Scanner in Java
            System.out.println("Reading file line by line in Java using Scanner");

            while(scanner.hasNextLine()){
                System.out.println(scanner.nextLine());
                // successCallback.invoke(scanner.nextLine());
                // emitStreamEvent("data", scanner.nextLine());
                // String streamName, String event, String code, String message
                emitStreamEvent(streamId, "data", scanner.nextLine());
                SystemClock.sleep(500);
                // this.getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("data", scanner.nextLine());
            }
            promise.resolve(1);
        } catch (Exception e) {
            // errorCallback.invoke(e.getMessage());
            emitStreamEvent(streamId, "end",  e.getMessage());
            promise.reject("FIN", e.getMessage());
        }*/
    }

    private static final class ReadFileTask extends AsyncTask<String, Void, Void> {

        interface Listener {
            void onRead(String message);
            void onFinish(String message);
            void onError(String message);
        }

        private Listener listener;
        public ReadFileTask(Listener listener) {
            this.listener = listener;
        }

        @Override
        protected Void doInBackground(String... params) {

            String path = params[0];
            // String streamId = params[0];
            try {
                String p  = "/storage/emulated/0/Download" + "/temp/articles3.csv";

                InputStream fs;
                fs = new FileInputStream(new File(path));
                // fs = new FileInputStream(new File(p));
                Scanner scanner = new Scanner(fs, "UTF-8");

                //reading file line by line using Scanner in Java
                System.out.println("Reading file line by line in Java using Scanner");

                while(scanner.hasNextLine()){
                    System.out.println(scanner.nextLine());
                    // successCallback.invoke(scanner.nextLine());
                    // emitStreamEvent("data", scanner.nextLine());
                    // String streamName, String event, String code, String message
                    listener.onRead(scanner.nextLine());
                    SystemClock.sleep(50);
                    // this.getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("data", scanner.nextLine());
                }
                listener.onFinish("");

            } catch (Exception e) {
                // errorCallback.invoke(e.getMessage());
                listener.onError(e.getMessage());
            }
            return null;
        }
    }
}
