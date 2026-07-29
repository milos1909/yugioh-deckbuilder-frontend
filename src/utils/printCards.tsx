import CardModel from "@/models/cardModel";
import { Card, Col, OverlayTrigger, Image } from "react-bootstrap";
import renderCardDetails from "./renderCardDetails";

export default function printCards(
    item : CardModel, 
    placement: 'left' | 'right', 
    imageWidth: number,
    imageHeight: number,
    onClick?: () => void,
    key?: string
){
    return (
        <Col key={key ?? item.id} xs='auto' onClick={onClick}>
            <Card>
                <OverlayTrigger placement={placement} overlay={renderCardDetails(item)}>
                    <Image src={`/images/${item.id}.jpg`} alt={item.name} width={imageWidth} height={imageHeight} />
                </OverlayTrigger>  
            </Card>
        </Col>
    );
}

// 134 196
// 87 127
