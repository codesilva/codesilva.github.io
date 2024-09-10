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
