import type { IMatch } from "./match.interface";
import { IPlayerMini } from "./player.interface";

export interface ISquad {
    _id?: string;
    description?: string;
    title?: string;
    players: IPlayerMini[];
    coach?: { _id?: string; name: string; avatar?: string };
    assistant?: { _id?: string; name: string; avatar?: string };
    match: IMatch;
    createdAt?: string;
    updatedAt?: string;
}