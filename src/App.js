import { Provider } from 'react-redux';
import './App.css';
import { StoryView } from './storyView/StoryView';
import store from './storySaga/store';

function App() {
  return (
    <Provider store={store}>
      <StoryView/>
    </Provider>
  );
}

export default App;
