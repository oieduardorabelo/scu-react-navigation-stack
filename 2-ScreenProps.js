// ========================================
//
// 2º Example
// `screenProps` updates from root navigator update
//
// ========================================
import React from "react";
import { Platform, Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import uuid from "uuid";

import { logRoute } from "./log";

const createId = () => uuid.v4();

class HomeScreen extends React.Component<{}> {
  shouldComponentUpdate(nextProps) {
    logRoute(nextProps);

    const isFocused = nextProps.navigation.isFocused()();

    if (isFocused) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Home!</Text>
        <Text>Route ID is: {this.props.navigation.state.key}</Text>
        <Text>Counter is: {this.props.screenProps.count}</Text>
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
  shouldComponentUpdate(nextProps) {
    logRoute(nextProps);

    const isFocused = nextProps.navigation.isFocused()();

    if (isFocused) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to About!</Text>
        <Text>Route ID is: {this.props.navigation.state.key}</Text>
        <Text>Counter is: {this.props.screenProps.count}</Text>
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

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: AboutScreen
  }
});

class Main extends React.Component {
  state = {
    count: 0
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  render() {
    return <MainStack screenProps={{ count: this.state.count }} />;
  }
}

export default Main;
