import Header from './components/layout/Header';
import Home from './components/layout/Home';
import Sidebar from './components/layout/Sidebar';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Home />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
