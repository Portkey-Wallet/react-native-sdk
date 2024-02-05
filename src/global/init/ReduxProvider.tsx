import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

type HigherOrderComponent<T = unknown> = (WrappedComponent: React.ComponentType<T>) => React.ComponentType<T>;

const ProviderComponent: HigherOrderComponent = WrappedComponent => {
  const component = (props: any) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };
  return component;
};

export default ProviderComponent;
