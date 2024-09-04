# DJI

Versao em android/app/build.gradle

```
    compileOnly ('com.dji:dji-sdk-provided:4.14.1')
```

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



