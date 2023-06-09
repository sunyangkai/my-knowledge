import React from 'react';
import { Ecnomic } from 'component-app/ecnomic';
import {
  UseDeferredValue,
  UseImperativeHandle,
  UseInsertionEffect,
  UseLayoutEffect,
  UseReducer,
  UseState,
  UseTransition,
  UseMemo,
  UseContext,
} from 'component-app/hooks';
import {
  HocRenderHook,
  ClassComponent,
  ReactEvent
} from 'component-app/react';
import './app.less';

const App = () => {
  return (
    <>
      <HocRenderHook />
    </>
  )
}

export default App;