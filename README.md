# Avoiding re-rendering of hidden screen in react-navigation

In this repository you'll find 2 examples of how to avoid re-rendering a hidden screen while using [react-navigation](https://github.com/react-navigation/react-navigation);

* I'm using `react-navigation@^2.0.0-rc.1`, but they also works in `^1.5.11`

They are:

* [1-PerScreen](./1-PerScreen.js) - Kind of subscription-ish, where each screen have their own "instance"/state of the publisher
* [2-ScreenProps](./2-ScreenProps) - Where your main stack is the subscriber and propagate updates to all screens via `screenProps`

You can check the [Twitter thread](https://twitter.com/sseraphini/status/981510349588516864) where it all started.
