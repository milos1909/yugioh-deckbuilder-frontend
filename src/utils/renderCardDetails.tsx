import CardModel from "@/models/cardModel"
import { Tooltip } from "react-bootstrap"

export default function renderCardDetails(card : CardModel){
    return(
      <Tooltip id={`tooltip-${card.id}`}>
        <strong>{card.name}</strong>
        <br/>

        {card.attribute && (
          <>
            {card.attribute}/
            <img src="/level.webp" alt="LEVEL:" width="15" height="15"></img>
            {card.level}
            <br/>
          </>
        )}

        {card.atk != null && (
          <>
            ATK/{card.atk} 
            {
              card.linkval  != null ? (<> Link-{card.linkval}</>) : (<> DEF/{card.def}</>)
            }
            <br/>
          </> 
        )}

        {card.race}/{card.type}
        <br/>
        <br/>
        {card.description}
      </Tooltip>
    )
  }