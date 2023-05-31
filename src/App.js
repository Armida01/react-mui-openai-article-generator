import { Routes, Route } from 'react-router-dom';

// Components
import {
  Layouts
} from './components';

// Pages
import { GenerateArticle } from './pages';

function App() {
  return (
      <div className="App">
          <Routes>
              <Route element={<Layouts />}>
                  <Route path="/" element={<GenerateArticle />}/>
              </Route>
          </Routes>
      </div>
  );
}

export default App;
