import React from 'react';
import { getApps } from 'firebase/app';

function App() {
  const firebaseApp = getApps()[0];

  return (
    <div className="App">
      <pre>{JSON.stringify(firebaseApp.options, null, 2)}</pre>
    </div>
  );
}

export default App;
