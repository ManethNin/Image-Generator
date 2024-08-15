import { surpriseMePrompts } from '../constants';

export const getRandomPrompt = (prompt) => {

    const index =  Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[index];

    if (prompt===randomPrompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}