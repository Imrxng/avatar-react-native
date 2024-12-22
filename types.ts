export interface Info {
    synopsis: string;
    yearsAired: string;
    genres: string[];
    creators: Creator[];
    id: number;
}

export interface Character {
    id: number;
    name: string;
    image: string;
    bio: Bio;
    physicalDescription: PhysicalDescription;
    personalInformation: PersonalInformation;
    politicalInformation: PoliticalInformation;
    chronologicalInformation: ChronologicalInformation;
}

export interface Episodes {
    id: number;
    Season: string;
    NumInSeason: string;
    Title: string;
    AnimatedBy: AnimatedBy;
    DirectedBy: DirectedBy;
    WrittenBy: string[];
    OriginalAirDate: string;
    "ProductionCode ": string;
    Viewers?: string;
}

export interface Question {
    id: number;
    question: string;
    possibleAnsers: string[];
    correctAnswer: string;
}


interface Creator {
    name: string;
    url: string;
}

interface Bio {
    alternativeNames: string[] | string;
    nationality: string;
    ethnicity: string;
    ages: string[] | string;
    born: string;
    died: string[] | string;
}

interface ChronologicalInformation {
    firstAppearance: string;
    lastAppearance: string[] | string;
    voicedBy: string[] | string;
}

interface PersonalInformation {
    loveInterst?: string;
    allies: string[];
    enemies: string[] | string;
    weaponsOfChoice: string[] | string;
    fightingStyles: string[] | string;
    loveInterest?: string;
}

interface PhysicalDescription {
    gender: "male" | "female";
    eyeColor: string;
    hairColor: string;
    skinColor: string;
}

interface PoliticalInformation {
    profession: string[] | ProfessionEnum;
    position: string[] | string;
    predecessor: string;
    successor: string;
    affiliations: string[] | string;
}

enum ProfessionEnum {
    Empty = "\n",
}

enum AnimatedBy {
    DRMovie = "DR Movie",
    JMAnimation = "JM Animation",
    MoiAnimation = "Moi Animation",
}

enum DirectedBy {
    AnthonyLioi = "Anthony Lioi",
    DaveFiloni = "Dave Filoni",
    EthanSpaulding = "Ethan Spaulding",
    GiancarloVolpe = "Giancarlo Volpe",
    JoaquimDOSSantos = "Joaquim Dos Santos",
    LaurenMACMullan = "Lauren MacMullan",
    MichaelDanteDiMartino = "Michael Dante DiMartino",
}


export interface Location {
    title: string;
    latitude: number;
    longitude: number;
    sound: string;
}
  