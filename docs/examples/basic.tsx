import MutateObserver from '../../src';
import React from 'react';

const App: React.FC = () => {
  const [flag, setFlag] = React.useState<boolean>(true);

  const onMutate = (mutations: MutationRecord[]) => {
    console.log(mutations);
  };

  return (
    <MutateObserver onMutate={onMutate}>
      <button className={flag ? 'aaa' : 'bbb'} onClick={() => setFlag(!flag)}>
        click
      </button>
    </MutateObserver>
  );
};

export default App;
