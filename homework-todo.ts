type SortBy = 'status' | 'createdAt';

interface INote {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    requiresConfirmation?: boolean;
    edit(title: string, content: string): void;
    markAsCompleted(): void;
}

class Note implements INote {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    requiresConfirmation?: boolean;

    constructor(title: string, content: string, requiresConfirmation: boolean = false) {
        if (!title || !content) {
            throw new Error('Note title and content cannot be empty');
        }
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.completed = false;
        this.requiresConfirmation = requiresConfirmation;
    }

    edit(title: string, content: string): void {
        if (this.requiresConfirmation) {
            const confirmed = confirm('Are you sure you want to edit this note?');
            if (!confirmed) {
                return;
            }
        }
        this.title = title;
        this.content = content;
        this.updatedAt = new Date();
    }

    markAsCompleted(): void {
        this.completed = true;
    }
}

interface ITodoList {
    notes: INote[];
    add(title: string, content: string, requiresConfirmation?: boolean): void;
    remove(note: INote): void;
    get(id: number): INote | undefined;
    getStats(): { total: number; completed: number; remaining: number };
    markAllAsCompleted(): void;
}

class TodoList implements ITodoList {
    notes: Note[] = [];

    add(title: string, content: string, requiresConfirmation: boolean = false): void {
        const note = new Note(title, content, requiresConfirmation);
        this.notes.push(note);
    }

    remove(note: Note): void {
        const index = this.notes.indexOf(note);
        if (index !== -1) {
            this.notes.splice(index, 1);
        }
    }

    get(id: number): INote | undefined {
        return this.notes[id];
    }

    getStats(): { total: number; completed: number; remaining: number } {
        const total = this.notes.length;
        const completed = this.notes.filter(note => note.completed).length;
        const remaining = total - completed;
        return { total, completed, remaining };
    }

    markAllAsCompleted(): void {
        this.notes.forEach(note => note.markAsCompleted());
    }
}

class SearchableTodoList extends TodoList {
    search(query: string): INote[] {
        return this.notes.filter(note => note.title.includes(query) || note.content.includes(query));
    }
}

class SortableTodoList extends TodoList {
    sort(by: SortBy): INote[] {
        const sorted = [...this.notes];
        if (by === 'status') {
            sorted.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
        } else if (by === 'createdAt') {
            sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        }
        return sorted;
    }
}
