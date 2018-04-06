// ========================================
//
// 1º Example
// per-screen "subscription"-ish updates
//
// ========================================
import React from "react";
import { Platform, Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import uuid from "uuid";

import { logRoute } from "./log";

const createId = () => uuid.v4();

const withInvervalCounter = Component => {
  class Counter extends React.Component<{}> {
    timer = null;

    state = {
      count: 0
    };

    shouldComponentUpdate(nextProps) {
      logRoute(nextProps);

      const isFocused = nextProps.navigation.isFocused()();

      if (isFocused) {
        return true;
      }

      return false;
    }

    componentDidMount() {
      this.timer = setInterval(() => {
        this.setState({ count: this.state.count + 1 });
      }, 1000);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }

    render() {
      return <Component count={this.state.count} {...this.props} />;
    }
  }

  return Counter;
};

class HomeScreen extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Home!</Text>
        <Text>Route ID is: {this.props.navigation.state.key}</Text>
        <Text>Counter is: {this.props.count}</Text>
        <Button
          title="About"
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "About",
              key: createId()
            });
          }}
        />
      </View>
    );
  }
}

class AboutScreen extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to About!</Text>
        <Text>Route ID is: {this.props.navigation.state.key}</Text>
        <Text>Counter is: {this.props.count}</Text>
        <Button
          title="Home"
          onPress={() => {
            this.props.navigation.navigate({
              routeName: "Home",
              key: createId()
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default createStackNavigator({
  Home: {
    screen: withInvervalCounter(HomeScreen)
  },
  About: {
    screen: withInvervalCounter(AboutScreen)
  }
});
