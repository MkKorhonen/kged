import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { getActiveRoom, setActiveRoom, addRoom, deleteRoom, getRooms } from 'actions/rooms'
import CreateContainer from './create_container'
import 'styles/rooms.scss'
import { defaultSelectStyles } from 'utils/styleObjects.js'

export class Rooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: '100%', overflow: 'auto' };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        var windowHeight = window.innerHeight;
        var listHeight = document.getElementsByClassName('listitem-container')[0].clientHeight
        if (listHeight > windowHeight) {
            this.setState({ height: windowHeight-200 });
        }
    }

    isActiveRoom(room) {
        if (this.props.activeRoom && this.props.activeRoom.attrs) {
            return this.props.activeRoom.attrs.id === room.attrs.id
        }
    }

    render() {
        var listStyle = {
            height: this.state.height,
            overflow: 'auto'
        }
        return (
            <div className="list-container">
                <div className="action-header-container">
                    <CreateContainer
                        initialState={{name: ''}}
                        addItem={this.props.addRoom}
                        namePlaceholder={'Syötä huoneen nimi'}
                        submitLabel={'Lisää huone'}
                    />
                    <div className="searchbox-container">
                        <Select styles={defaultSelectStyles}
                                getOptionLabel={(option)=>option.attrs.id}
                                options={this.props.rooms}
                                onChange={e => this.props.onClickRoom(e)}
                                noOptionsMessage={() => 'Ei tuloksia'}
                                placeholder="Etsi huonetta..."/>
                    </div>
                </div>
                <div className="listitem-container" style={listStyle}>
                    {this.props.rooms.length === 0 &&
                        <div className="empty-list-text">
                            Ei huoneita! Luo uusi huone tai käytä toimintapalkin Tuo-painiketta tuodaksesi aiemmin luomasi materiaalit järjestelmään.
                        </div>
                    }
                    {this.props.rooms.map((room) => {
                        return (
                            <div
                                className={'listitem ' + (this.isActiveRoom(room) ? 'active-listitem' : '')}
                                key={room.attrs.id}
                                onClick={() => this.props.onClickRoom(room)}
                            >
                                <span className="listitem-name">
                                    {room.attrs.id}
                                </span>
                                {this.isActiveRoom(room) &&
                                    <span className="trash" onClick={(e) => {
                                        this.props.removeRoom(room)
                                        e.stopPropagation()
                                    }}><FontAwesomeIcon icon="trash-alt" />&nbsp;</span>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rooms: getRooms(state),
    activeRoom: getActiveRoom(state)
})

const mapDispatchToProps = dispatch => ({
    onClickRoom: room => dispatch(setActiveRoom(room.attrs.id)),
    addRoom: room => dispatch(addRoom(room)),
    removeRoom: room => dispatch(deleteRoom(room)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Rooms)
