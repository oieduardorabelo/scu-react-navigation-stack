export function logRoute(props) {
  const isFocused = props.navigation.isFocused()();

  console.log(
    `routeName: ${props.navigation.state.routeName}`,
    `id: ${props.navigation.state.key}`,
    `isFocused: ${isFocused}`
  );
}
