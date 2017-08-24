import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stream extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return <div />;
    }
}
const mapStateToProps = function(state, ownProps) {
    return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
