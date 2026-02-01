import React, { useState } from 'react'
import FetchData from './Components/FetchData'
import FetchDataWithClient from './Components/FetchDataWithClient'

function App() {
  const [useGeneratedClient, setUseGeneratedClient] = useState(false)

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setUseGeneratedClient(!useGeneratedClient)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {useGeneratedClient
            ? 'Switch to Manual Fetch (UseFetch Hook)'
            : 'Switch to Generated API Client'}
        </button>
      </div>

      {useGeneratedClient ? <FetchDataWithClient /> : <FetchData />}
    </>
  )
}

export default App