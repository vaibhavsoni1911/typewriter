import React from 'react';
import { connect } from "react-redux";

function WordCounter(props) {
    return (
        <span>WPM : {props.wpm}</span>
    )
}

const mapStateToProps = state => {
    return {
        wpm: state.wpm
    }
}

export default connect(mapStateToProps)(WordCounter)