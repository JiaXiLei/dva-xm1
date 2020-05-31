import dva from 'dva';
import './index.less'
import { createBrowserHistory } from 'history'

// 1. Initialize
const app = dva({
    history: createBrowserHistory()
});

window.app = app

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('@/routes').default);

// 5. Start
app.start('#root');
