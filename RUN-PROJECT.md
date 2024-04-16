# How to Run The Project

## iOS

### 1. select branch

The current main branch is `master`, please switch to this branch to proceed.

### 2. `yarn` and `yarn start` in the root directory

Run "yarn" to add dependencies and run "yarn start" to start the React Native local server.

```shell
yarn
yarn start
```

### 3.  add `.env` file in the root directory

The contents of the `.env` file are similar to the example below. You need to apply for these IDs on the Google Developer website. If for debugging convenience, you can temporarily write random content, but in this case, you cannot complete the Google login process.

```Properties
# Google
GOOGLE_WEB_CLIENT_ID = "xxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_IOS_CLIENT_ID = "xxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_ANDROID_CLIENT_ID = "xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
```

### 4.  run iOS project

Switch to the `app_ios` directory:

```shell
cd app_ios
```

Then, run `pod install` to add iOS native dependencies:

```shell
rm -rf build/
pod install
```

When `pod install` completed, open the iOS project and run this protject.

## Android

To be completed