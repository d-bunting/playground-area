import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { Idea } from "../models/idea";
import { SortOption } from "../models/sort-option";
import { IdeaStateService } from "./idea-state.service";

@Injectable({
    providedIn: 'root',
})
export class IdeaService {
    private _ideaChanged = new Subject<Idea>();
    private _ideaAdded = new ReplaySubject<Idea>(1);
    
    private _ideas: Idea[] = [];
    private _sortOptions: SortOption[] = [];

    constructor(private _ideaStateService: IdeaStateService) {
        this.init();
        this.loadIdeas();
    }

    public get ideas(): Idea[] {
        return this._ideas;
    }

    public get ideaChanged(): Observable<Idea> {
        return this._ideaChanged;
    }

    public get ideaAdded(): Observable<Idea> {
        return this._ideaAdded;
    }

     /**
     * Add an idea to the list
     * @param idea The idea to add
     */
      public addIdea(idea: Idea): void {
        this._ideaAdded.next(idea);
        this._ideas.unshift(idea);
        this.saveIdeas();
    }

    /**
     * Remove an idea from the list
     * @param idea The idea to remove
     */
    public removeIdea(idea: Idea): void {
        const foundAt = this._ideas.indexOf(idea);
        if (foundAt > -1) {
            this._ideas.splice(foundAt, 1);
            this.saveIdeas();
        }
    }

    /**
     * Save the idea to local storage
     * @param idea the idea to update 
     */
    public updateIdea(idea: Idea): void {
        this.saveIdeas();
        this._ideaChanged.next(idea);
    }

    /**
     * Clear the ideas list
     */
    public clear(): void {
        this._ideas = [];
        this.saveIdeas();
    }

    /**
     * Returns the sort options for the ideas list
     * @returns The sort options
     */
    public sortOptions(): SortOption[] {
        return this._sortOptions;
    }

    /**
     * Sort the ideas list
     */
    public sort(sortOption?: SortOption): void {
        if (!sortOption) {
            return;
        }

        this._ideas?.sort((a: Idea, b: Idea) => {
            const compareA = a[sortOption.field];
            const compareB = b[sortOption.field];
            let result = 0;

            if(typeof(compareA) === 'string'){
                result = compareA.toString().localeCompare(compareB.toString());
            } else {
                result = compareA < compareB ? -1 : compareB < compareA ? 1 : 0;
            }

            return result * (sortOption.ascending ? 1 : -1);
        });
    }

    private loadIdeas(): void {
        this._ideas = this._ideaStateService.load();
        this.sort(this._sortOptions[0]);
    }

    private saveIdeas(): void {
        this._ideaStateService.save(this._ideas);
    }

    private init(): void {
        this._sortOptions = [
            { description: 'Newest first', field: 'createdAt', ascending: false },
            { description: 'Oldest first', field: 'createdAt', ascending: true },
            { description: 'Title a-z', field: 'title', ascending: true },
            { description: 'Title z-a', field: 'title', ascending: false },
        ]
    }
}