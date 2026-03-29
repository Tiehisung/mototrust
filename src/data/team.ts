import { ITeam } from "@/types/match.interface";

export const TEAM: ITeam & { url: string, officialSignature: string } = {
    _id: 'teamBnfc',
    url: 'https://bunyenifc.vercel.app',
    name: 'Bunyeni FC',
    alias: 'Yeni FC',
    community: "Wa-Konjiehi",
    logo: 'https://res.cloudinary.com/djzfztrig/image/upload/v1774785880/assets-storage/zccn69hm4oe7dvcbbdvo.png',
    officialSignature: 'https://res.cloudinary.com/dgp4vzn3m/image/upload/v1766906326/assets-storage/signature_alypm1.png',
    currentPlayers: [],
    contact: "0241508430",
    contactName: "Adam Wahid",
    createdAt: "2023-11-28T10:30:00Z",
    updatedAt: "2023-11-28T10:30:00Z",
};





// Type for the team data
export type Team = typeof TEAM;