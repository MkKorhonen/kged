import React from 'react';
import { connect } from 'react-redux';

import 'styles/preview.scss';
import { exportProject } from 'actions/global';

export class ActionBar extends React.Component {
    render() {
        return (
            <div className="row pre-controls">
                <div className="col">
                    Kumoa
                </div>
                <div className="col">
                    Toista
                </div>
                <div className="col">
                    Tallenna
                </div>
                <div className="col">
                    Tuo
                </div>
                <div className="col" onClick={this.props.onExport}>
                    Vie
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    onExport: event => dispatch(exportProject(event)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActionBar);
