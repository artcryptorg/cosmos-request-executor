import inquirer from 'inquirer';
import { ChoiceType, PromptType } from './prompt.type';

export class PromptService {
    public async input<T>(message: string, type: PromptType, choicesArray: ChoiceType): Promise<T[]> {
        const results: T[] = [];

        for (const choices of choicesArray) {
            const { result } = await inquirer.prompt<{ result: T }>([
                {
                    type,
                    name: 'result',
                    message,
                    choices
                }
            ]);
            results.push(result);
        }

        return results;
    }
}