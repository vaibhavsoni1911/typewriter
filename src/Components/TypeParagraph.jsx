import React from 'react';
import { Card } from "react-bootstrap";
import styled from 'styled-components';

const CorrectText = styled.span`
  background-color:#2cf12c;
`
const TextToType = styled.span``

const CardWrapper = styled(Card) `
    margin-top: 30px;
`

export default function TypeParagraph(props) {
    return (
        <CardWrapper>
            <Card.Body>
                {
                    props.typedLength ? <CorrectText>{props.text.substr(0, props.typedLength)}</CorrectText> : null
                }
                <TextToType>
                    {
                        props.text.substr(props.typedLength)
                    }
                </TextToType>
            </Card.Body>
        </CardWrapper>
    )
}
