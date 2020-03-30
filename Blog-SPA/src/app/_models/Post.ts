import { Photo } from './Photo';

export interface Post {
    id: number;
    title: string;
    content: string;
    created: Date;
    photos?: Photo[];
}