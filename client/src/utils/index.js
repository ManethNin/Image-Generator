import { surpriseMePrompts } from '../constants';
import FileSaver from "file-saver"

export function getRandomPrompt(prompt){

    const index =  Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt = surpriseMePrompts[index];

    if (randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt;
}

export async function downloadPhoto(_id,photo ){
    FileSaver.saveAs(photo, `download-${_id}`)
}