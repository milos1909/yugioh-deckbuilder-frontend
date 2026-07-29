import DeckModel from "./deckModel";

export default interface DeckPageModel {
    decks: DeckModel[],
    totalPages: number,
    totalElements: number
}