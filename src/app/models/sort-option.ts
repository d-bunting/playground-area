import { Idea } from "./idea";

export interface SortOption {
    description: string,
    field: 'title' | 'createdAt',
    ascending: boolean,
}