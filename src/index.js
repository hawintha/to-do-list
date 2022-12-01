import { task } from './tasks.js';
import { listen } from './listeners.js';

task.loadTasks();
listen();