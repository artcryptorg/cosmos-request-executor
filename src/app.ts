import { PromptService } from './core/prompt/prompt.service';
import { ChoiceType } from './core/prompt/prompt.type';
import { FetchExecutor } from './requests/fetch/fetch.executor';

export class App {
    async run() {
        (new FetchExecutor()).execute()
    }
}
const app = new App();
app.run()

