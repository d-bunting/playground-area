import { Injectable } from "@angular/core";
import { Idea } from "../models/idea";

@Injectable({
    providedIn: 'root',
})
export class IdeaStateService {
    private readonly _stateKey = 'ideas';

    /**
     * Save the list locally
     * @param ideas The ideas to save
     */
    public save(ideas: Idea[]) {
        try {
            localStorage.setItem(this._stateKey, JSON.stringify(ideas));
        } catch (error) {
            console.error(`Error saving state. Error:: ${error}`);
        }
    }

    /**
     * Load the locally saved ideas list
     * @returns The list of ideas
     */
    public load(): Idea[] {
        try {
            return JSON.parse(localStorage.getItem(this._stateKey) || '[]');
        } catch (error) {
            console.error(`Error loading state. Error:: ${error}`);
            return [];
        }
    }
}