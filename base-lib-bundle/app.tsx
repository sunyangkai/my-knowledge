import React from 'react';
import ReactDOM from 'react-dom'
import { routes } from './home/router';
import { RenderAppRoutes, history } from 'suny-foundation/router';
import { Router } from 'react-router';

import './index.less'

const RouteContainer = () => (
   <Router basename="/main" history={history}>
      <RenderAppRoutes routes={routes} fatherPath="" />
   </Router>
)
const render = () => {
   const MOUNT_NODE = document.getElementById('root');
   ReactDOM.render(<RouteContainer />, MOUNT_NODE)
}

export default render;
