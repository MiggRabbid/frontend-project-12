import { Provider as Rollbar, ErrorBoundary } from '@rollbar/react';

import rollbarConfig from '../../rollbar/rollbarConfig';

const RollbarProvider = ({ children }) => (
  <Rollbar config={rollbarConfig}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Rollbar>
);

export default RollbarProvider;
