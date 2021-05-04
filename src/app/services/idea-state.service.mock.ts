import { Idea } from "../models/idea";
import { IdeaStateService } from "./idea-state.service";

export class IdeaStateServiceMock extends IdeaStateService {
    public save(ideas: Idea[]) {}
    public load() : Idea[] {
        return [];
    }
}