import React from 'react'
import * as bs from 'react-bootstrap'

function About(props) {
    return (
        <bs.Container>
            <bs.Row>
                <bs.Col>
                    <bs.Card.Body>
                        <bs.Card.Title className='text-center mt-3' style={{fontSize: '32pt'}}>
                            About Us
                        </bs.Card.Title>
                        <hr />
                        <bs.Card.Text className='text-center mb-3' style={{fontSize: '20pt'}}>
                            When the game is on the line and one of your best players gets into foul trouble how do you know which player will be
                            the best replacement? It can be hard to know exactly which player will make the largest impact on the game. With
                            our state of the art recommender tool, analytics will make the tough decisions for you. Not only will this maximize 
                            game perfomance but will also give coaches something to blame losing efforts on.
                        </bs.Card.Text>
                    </bs.Card.Body>
                </bs.Col>
            </bs.Row>
        </bs.Container>
    )
}

export default About