import 'babel-polyfill';

import queue from './';

const schedule = queue();

setTimeout(() => {
    for (let i = 0; i < 100; i++) {
        schedule({verb: 'POST', url: 'http://localhost:8080/trackings', data: {counter: i}});
    }
}, 5000);
