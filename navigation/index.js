import React, { Component } from "react";

import BottomTabNavigator from "./BottomTabNavigator";
// import { auth } from '../Firebase'

export default class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoggedIn: false,
    };
  }

  // componentDidMount() {
  //   this.setState({ isLoading: true })
  //   console.log('APP NAV PROPS', this.props)
  //   this.unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       console.log('LOGGED IN')
  //       this.setState({ isLoading: false, isLoggedIn: true })
  //     } else {
  //       this.setState({ isLoading: false })
  //     }
  //   })
  // }

  // componentWillUnmount() {
  //   this.unsubscribe && this.unsubscribe();
  // }

  render() {
    return <BottomTabNavigator />;
    // if (this.state.isLoading) return null
    // else return !this.state.isLoggedIn ? <LoginNavigator /> : <BottomTabNavigator />
  }
}
