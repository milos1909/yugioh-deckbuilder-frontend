export default interface CardModel {
    id: number
    name: string
    type: string
    description: string
    atk?: number
    def?: number
    level?: number
    race: string 
    attribute?: string
    archetype?: string
    linkval?: number
    imageUrlSmall: string
}