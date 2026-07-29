import CardModel from "./cardModel";

export default interface CardPageModel {
    cards: CardModel[],
    totalPages: number,
    totalElements: number
}