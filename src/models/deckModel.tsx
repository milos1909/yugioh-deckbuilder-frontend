import CardModel from "./cardModel";

export default interface DeckModel {
    id: number;
    name: string;
    userId: number;
    main: CardModel[]
    extra: CardModel[]
}