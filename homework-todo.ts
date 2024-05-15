interface INote {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    requiresConfirmation: boolean;
    edit(title: string, content: string): void;
    markAsCompleted(): void;
}

class Note implements INote {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
    requiresConfirmation: boolean;

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

    edit(title: string, content: string) {
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

    markAsCompleted() {
        this.completed = true;
    }
}

interface ITodoList {
    notes: INote[];
    add(note: INote): void;
    remove(note: INote): void;
    get(id: number): INote | undefined;
    getStats(): { total: number; completed: number; remaining: number };
    search(query: string): INote[];
    sort(by: 'status' | 'createdAt'): INote[];
}

class TodoList implements ITodoList {
    notes: Note[] = [];

    add(note: Note) {
        this.notes.push(note);
    }

    remove(note: Note) {
        const index = this.notes.indexOf(note);
        if (index !== -1) {
            this.notes.splice(index, 1);
        }
    }

    get(id: number) {
        return this.notes[id];
    }

    getStats() {
        const total = this.notes.length;
        const completed = this.notes.filter(note => note.completed).length;
        const remaining = total - completed;
        return { total, completed, remaining };
    }

    search(query: string) {
        return this.notes.filter(note => note.title.includes(query) || note.content.includes(query));
    }

    sort(by: 'status' | 'createdAt') {
        const sorted = [...this.notes];
        if (by === 'status') {
            sorted.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
        } else if (by === 'createdAt') {
            sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        }
        return sorted;
    }
}
