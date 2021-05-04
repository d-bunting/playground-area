import { Idea } from "../models/idea";
import { IdeaStateService } from "./idea-state.service";
import { IdeaStateServiceMock } from "./idea-state.service.mock";
import { IdeaService } from "./idea.service";

describe('IdeaService', () => {
  let stateServiceMock = {
    save: (ideas: Idea[]) => { },
    load: () => []
  } as Partial<IdeaStateService> as IdeaStateService;

  describe('Load Service', () => {
    it('should create', () => {
      let service = new IdeaService(stateServiceMock);
      expect(service).toBeTruthy();
    });

    it('should load ideas', () => {
      spyOn(stateServiceMock, 'load');
      new IdeaService(stateServiceMock);
      expect(stateServiceMock.load).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ideas list', () => {
    let service: IdeaService;
    beforeEach(() => {

      service = new IdeaService(stateServiceMock);
    });
    it('should add an idea to ideas', () => {
      let idea = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      service.addIdea(idea);

      expect(service.ideas.length).toEqual(1);
    });

    it('should add multiple ideas to ideas', () => {
      let idea = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      service.addIdea(idea);
      service.addIdea(idea);
      service.addIdea(idea);
      service.addIdea(idea);

      expect(service.ideas.length).toEqual(4);
    });

    it('should remove one idea from ideas', () => {
      let idea = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      service.addIdea(idea);

      expect(service.ideas.length).toEqual(1);

      service.removeIdea(idea);

      expect(service.ideas.length).toEqual(0);
    });

    it('should remove multiple ideas from ideas', () => {
      let idea = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      let idea2 = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      service.addIdea(idea);
      service.addIdea(idea2);

      expect(service.ideas.length).toEqual(2);

      service.removeIdea(idea);

      expect(service.ideas.length).toEqual(1);
    });

    // todo should update idea - test calls save on state service with correct object
    // todo should update idea - test observable notifies

    it('should clear ideas', () => {
      let idea = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      let idea2 = { title: 'testTitle', description: 'testDescription' } as Partial<Idea> as Idea;
      service.addIdea(idea);
      service.addIdea(idea2);

      expect(service.ideas.length).toEqual(2);

      service.clear();

      expect(service.ideas.length).toEqual(0);
    });

    it('should clear ideas when already empty', () => {
      expect(service.ideas.length).toEqual(0);

      service.clear();
      service.clear();

      expect(service.ideas.length).toEqual(0);
    });

    // todo should clear ideas - test calls save on state service with correct object 

    it('should sort ideas alphabetically asc', () => {
      let idea = { title: 'def', description: 'testDescription' } as Partial<Idea> as Idea;
      let idea2 = { title: 'Abc', description: 'testDescription' } as Partial<Idea> as Idea;
      let idea3 = { title: 'Cbc', description: 'testDescription' } as Partial<Idea> as Idea;
      let idea4 = { title: 'abc', description: 'testDescription' } as Partial<Idea> as Idea;

      service.addIdea(idea);
      service.addIdea(idea2);
      service.addIdea(idea3);
      service.addIdea(idea4);

      service.sort(service.sortOptions().find(o => o.field === 'title' && o.ascending));

      expect(service.ideas[0]).toEqual(idea4);
      expect(service.ideas[1]).toEqual(idea2);
      expect(service.ideas[2]).toEqual(idea3);
      expect(service.ideas[3]).toEqual(idea);
    });

    // todo and so on..
  });

});
