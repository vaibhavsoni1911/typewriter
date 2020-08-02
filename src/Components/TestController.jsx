import React, { Component } from 'react';
import { TYPE_TEXT, TEST_TIME_LIMIT_IN_SECONDS } from '../constants';
import TypeParagraph from "./TypeParagraph";
import { connect } from "react-redux";
import styled from "styled-components";
import Timer from "./Timer";
import WordCounter from "./WordCounter";
import { UPDATE_WPM } from "../actions"
import {Alert} from "react-bootstrap";

const StyledInput = styled.input`
    margin-top: 30px;
    margin-bottom: 20px;
    border-radius: 4px;
    min-width:100%;
`

class TestController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wpm: 0,
            typedLength: 0,
            inputValue: '',
            timeRemaining: TEST_TIME_LIMIT_IN_SECONDS
        }
        this.timerInterval = React.createRef(null);
    }

    componentDidMount() {
        this.timerInterval.current = setInterval(() => {
            if (this.state.timeRemaining > 0) {
                this.setState({
                    timeRemaining: this.state.timeRemaining - 1
                })
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timerInterval.current)
            clearInterval(this.timerInterval.current)
    }


    validateInput = () => {

        if (this.state.inputValue === TYPE_TEXT.substr(this.state.typedLength) || (this.state.inputValue.endsWith(' ') && this.state.inputValue)) {
            if (this.state.inputValue === TYPE_TEXT.substr(this.state.typedLength, this.state.inputValue.length)) {
                this.setState({
                    typedLength: this.state.typedLength + this.state.inputValue.length,
                    inputValue: ''
                }, () => {
                    if (this.state.typedLength === TYPE_TEXT.length) {
                        this.componentWillUnmount();
                    }
                    this.props.countWPM(this.state.typedLength, TEST_TIME_LIMIT_IN_SECONDS - this.state.timeRemaining)
                })
            }
        }

    }

    onInputChange = (e) => {

        this.setState({
            inputValue: e.target.value
        }, this.validateInput)
    }

    render() {
        return <>
            <TypeParagraph text={TYPE_TEXT} typedLength={this.state.typedLength} />
            <StyledInput placeholder="start typing text here" disabled={!this.state.timeRemaining || this.state.typedLength === TYPE_TEXT.length} type="text" name="write" value={this.state.inputValue} onChange={this.onInputChange} />
            <div className='d-flex justify-content-between'>
                <Timer remainingTime={this.state.timeRemaining} />
                <WordCounter />
            </div>
            <div className="col-md mt-5">
                {
                    !this.state.timeRemaining || this.state.typedLength === TYPE_TEXT.length ? <Alert variant="success">
                        Your test has ended</Alert> : null
                }
            </div>

        </>
    }
}


const mapDispatchToProps = dispatch => {
    return {
        countWPM: (typedCharLength, timeTaken) => dispatch({ type: UPDATE_WPM, timeTaken: timeTaken, typedCharLength: typedCharLength })
    }
}
export default connect(null, mapDispatchToProps)(TestController);