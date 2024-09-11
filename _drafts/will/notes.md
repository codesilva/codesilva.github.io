## Performance da tela de listagem de missoes

- Tirar o mapa melhorou bastante a performance pois não precisa ficar renderizando o mapa. Dá pra usar static map.

A parte de detalhes da missão ainda causa o crash do app. Acredito que seja por causa do mapa - de alguma forma pois há
um log `map created`.

```
I/flutter (12287): map created
I/flutter (12287): false
I/flutter (12287): valid true
I/flutter (12287): map created
I/flutter (12287): [null, null, null]
I/flutter (12287): false
I/flutter (12287): valid true
I/flutter (12287): map created
I/flutter (12287): [null, null, null]
E/AndroidRuntime(12287): FATAL EXCEPTION: GLThread 2657
E/AndroidRuntime(12287): Process: com.geocoor.willflyapp, PID: 12287
E/AndroidRuntime(12287): java.lang.NullPointerException: Attempt to get length of null array
E/AndroidRuntime(12287): 	at java.nio.ByteBufferAsIntBuffer.put(ByteBufferAsIntBuffer.java:122)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.gl.buffer.n.i(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):2)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.gl.buffer.n.d(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):3)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.gl.drawable.d.s(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):2)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.gl.drawable.ao.s(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):12)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.bz.s(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):29)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.bs.b(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):151)
E/AndroidRuntime(12287): 	at com.google.maps.api.android.lib6.gmm6.vector.an.run(:com.google.android.gms.dynamite_mapsdynamite@214815051@21.48.15 (040408-0):48)
D/FlutterGeolocator(12287): Flutter engine disconnected. Connected engine count 0
E/FlutterGeolocator(12287): Geolocator position updates stopped
D/FlutterGeolocator(12287): Stopping location service.
D/FlutterGeolocator(12287): Unbinding from location service.
```

Sim, para os waypoints é renderizado um outro mapa.

`lib/ui/mission_detail_page/mission_detail_content_widget/mission_detail_waypoint_section_widget.dart:118`

https://stackoverflow.com/questions/72431155/fatal-exception-glthread-104139-in-flutter-android-app

Bug do nullpointer: [https://issuetracker.google.com/u/1/issues/35822688](https://issuetracker.google.com/u/1/issues/35822688)



```
E/flutter (13225): [ERROR:flutter/runtime/dart_vm_initializer.cc(41)] Unhandled Exception: Null check operator used on a null value
E/flutter (13225): #0      MissionControllerBloc._quitMission (package:app/blocs/mission_controller_bloc.dart:185)
E/flutter (13225): #1      MissionControllerBloc._mapEventToState (package:app/blocs/mission_controller_bloc.dart:59)
E/flutter (13225): #2      new MissionControllerBloc.<anonymous closure> (package:app/blocs/mission_controller_bloc.dart:20)
E/flutter (13225): #3      Bloc.on.<anonymous closure>.handleEvent (package:bloc/src/bloc.dart:229)
E/flutter (13225): #4      Bloc.on.<anonymous closure> (package:bloc/src/bloc.dart:238)
E/flutter (13225): #5      _MapStream._handleData (dart:async/stream_pipe.dart:213)
E/flutter (13225): #6      _ForwardingStreamSubscription._handleData (dart:async/stream_pipe.dart:153)
E/flutter (13225): #7      _RootZone.runUnaryGuarded (dart:async/zone.dart:1594)
E/flutter (13225): #8      CastStreamSubscription._onData (dart:_internal/async_cast.dart:85)
E/flutter (13225): #9      _RootZone.runUnaryGuarded (dart:async/zone.dart:1594)
E/flutter (13225): #10     _BufferingStreamSubscription._sendData (dart:async/stream_impl.dart:339)
E/flutter (13225): #11     _BufferingStreamSubscription._add (dart:async/stream_impl.dart:271)
E/flutter (13225): #12     _ForwardingStreamSubscription._add (dart:async/stream_pipe.dart:123)
E/flutter (13225): #13     _WhereStream._handleData (dart:async/stream_pipe.dart:195)
E/flutter (13225): #14     _ForwardingStreamSubscription._handleData (dart:async/stream_pipe.dart:153)
E/flutter (13225): #15     _RootZone.runUnaryGuarded (dart:async/zone.dart:1594)
E/flutter (13225): #16     _BufferingStreamSubscription._sendData (dart:async/stream_impl.dart:339)
E/flutter (13225): #17     _DelayedData.perform (dart:async/stream_impl.dart:515)
E/flutter (13225): #18     _PendingEvents.handleNext (dart:async/stream_impl.dart:620)
E/flutter (13225): #19     _PendingEvents.schedule.<anonymous closure> (dart:async/stream_impl.dart:591)
E/flutter (13225): #20     _microtaskLoop (dart:async/schedule_microtask.dart:40)
E/flutter (13225): #21     _startMicrotaskLoop (dart:async/schedule_microtask.dart:49)
E/flutter (13225):
```

## Map issue

Acredito que em PilotFragment.kt é preciso chamar `onCreate` em mapWidget.

To encucado com o binding de PilotFragment. Creio que deveria ser inicialiczado em algum lugar.


https://developer.dji.com/api-reference/android-uilib-api/Widgets/DUXMapWidget.html#duxmapwidget_initgooglemap_inline
https://developer.dji.com/api-reference/android-uilib-api/Widgets/DJIMap.html#djimap

Exemplo de mapa: https://github.com/dji-sdk/Mobile-UXSDK-Android/blob/6a28754964a7517a0602dfda0bad09adc938489a/sample/app/src/main/java/com/dji/ux/sample/MapWidgetActivity.java#L151

- https://sdk-forum.dji.net/hc/en-us/community/posts/21364221146905-Change-from-AMAP-to-Google-Maps
- https://developer.dji.com/api-reference/android-uilib-api/Widgets/DUXMapWidget.html#duxmapwidget_initgooglemap_inline


# DJI

Versao em android/app/build.gradle

```
    compileOnly ('com.dji:dji-sdk-provided:4.14.1')
```

https://github.com/dji-sdk/Mobile-SDK-Android/blob/462fb6cff590a9a7f0d5abfc127ab172386225cf/README.md?plain=1#L63

uxsdk

https://github.com/dji-sdk/Mobile-UXSDK-Android
https://github.com/dji-sdk/Mobile-SDK-Android/tree/v4.17

## Build da APK

] Your project is configured to compile against Android SDK 33, but the following plugin(s) require to be compiled against a higher Android SDK version:
[        ] - flutter_libphonenumber_android compiles against Android SDK 34
[        ] - flutter_plugin_android_lifecycle compiles against Android SDK 34
[        ] - google_maps_flutter_android compiles against Android SDK 34
[        ] - image_picker_android compiles against Android SDK 34
[        ] - shared_preferences_android compiles against Android SDK 34
[        ] - sqflite compiles against Android SDK 34
[        ] - url_launcher_android compiles against Android SDK 34
[        ] Fix this issue by compiling against the highest Android SDK version (they are backward compatible).
[        ] Add the following to /Users/edysilva/projects/personal/willfly-app/android/app/build.gradle:
[        ]     android {
[        ]         compileSdk = 34
[        ]         ...
[        ]     }

### Chamada ao sdk manager

./lib/main.dart:48:        BlocProvider<DJISDKManagerBloc>(

Dependencias para estudar

```
  bloc: ^6.1.1
  flutter_bloc: ^6.0.5
```

Possivel problema de permissao: https://console.firebase.google.com/u/0/project/dji-ux-sdk-test-app/crashlytics/app/android:com.geocoor.willflyapp/issues/76c2c18a32d81f9e53d88b4b6fe93043?time=last-thirty-days&types=crash&sessionEventKey=66C3873F010800015EAF8DAE3342BA4C_1983356603483215109

## Links uteis

- [DJI SDK](https://developer.dji.com/mobile-sdk/documentation/introduction/index.html)
- [DJI SDK manager](https://developer.dji.com/iframe/mobile-sdk-doc/android/reference/dji/sdk/SDKManager/DJISDKManager.html)
https://docs.flutter.dev/platform-integration/platform-channels
DJI release notes for 4.17 -> https://developer.dji.com/document/122b5969-d64d-4752-8452-400c41240aa5
https://github.com/dji-sdk/Mobile-SDK-Android
https://developer.dji.com/document/6659920d-b5cf-495e-8ff8-a6071ea43f12

## IOS

```
  pod 'DJI-SDK-iOS', '~> 4.14'#'~> 4.14-trial2'
  pod 'DJI-UXSDK-iOS', '~> 4.14'#'~> 4.14-trial1'
  pod 'DJIWidget', '~> 1.6.4'
```



## Tentando rodar dji puro

Precisei atualizar o gradle para versao 8 devido a minha versao do java que era a 17 -> motivo [https://discuss.gradle.org/t/unsupported-class-file-major-version-61/44988/2](https://discuss.gradle.org/t/unsupported-class-file-major-version-61/44988/2)

build tools 31 corrupted.

[https://stackoverflow.com/questions/68387270/android-studio-error-installed-build-tools-revision-31-0-0-is-corrupted](https://stackoverflow.com/questions/68387270/android-studio-error-installed-build-tools-revision-31-0-0-is-corrupted)
