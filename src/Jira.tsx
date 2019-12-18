import React from 'react'
import logo from './logo.svg'
import './App.css'
import JIRA from '@atlassian/jira';

const clientOptions = {
  baseUrl: 'https://jira.dev.clover.com',
  headers: {},
  options: { timeout: 10 }
};
const jira = new JIRA(clientOptions);
jira.authenticate({
  type: 'basic',
  username: '',
  password: ''
});

jira.myself.getCurrentUser({ expand: '' }, x => console.log(x))

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App