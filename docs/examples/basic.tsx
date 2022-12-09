import MutateObserver from '../../src';
import React from 'react';

const App: React.FC = () => {
  const [size, setSize] = React.useState<number>(50);

  const onMutate = (mutations: MutationRecord[]) => {
    console.log(mutations);
  };

  return (
    <>
      <MutateObserver onMutate={onMutate}>
        <button style={{ width: size }} onClick={() => setSize(s => s + 10)}>
          click
        </button>
      </MutateObserver>
    </>
  );
};

export default App;
