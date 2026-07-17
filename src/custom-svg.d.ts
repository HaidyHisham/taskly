import * as React from 'react';

declare module '*.svg' {
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}

