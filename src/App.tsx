import { useEffect, useState } from 'react'
import './App.css'

import { Dashboard } from '@uppy/react';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';



function App() {
  const [uppy] = useState(() => new Uppy({ restrictions: { maxNumberOfFiles: 1 } }));
  const [fileContents, setFileContents] = useState<string | null>(null);

  useEffect(() => {
    uppy.on('file-added', (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContents(event.target?.result as string);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsText(file.data);
    });

    return () => uppy.close();
  }, [uppy]);

  return (
    <div className="App">
      <h1>Uppy File Reader</h1>
      <Dashboard uppy={uppy} />
      {fileContents && (
        <pre id="file-contents">{fileContents}</pre>
      )}
    </div>
  );
}

export default App
