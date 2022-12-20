import { task } from './tasks.js';
import { project } from './projects.js';
import { listen } from './listeners.js';

task.load();
project.load();
listen();