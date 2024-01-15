"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // @ts-ignore
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  // @ts-ignore
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    // @ts-ignore
    return this.props.children;
  }
}
