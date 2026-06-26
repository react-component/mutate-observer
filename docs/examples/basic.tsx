import React, { useCallback } from 'react';
import MutateObserver from '../../src';

const App: React.FC = () => {
  const [flag, setFlag] = React.useState<boolean>(true);

  const onMutate = useCallback((mutations: MutationRecord[]) => {
    console.log(mutations);
  }, []);

  return (
    <MutateObserver onMutate={onMutate}>
      <button className={flag ? 'aaa' : 'bbb'} onClick={() => setFlag(!flag)}>
        click
      </button>
    </MutateObserver>
  );
};

export default App;
