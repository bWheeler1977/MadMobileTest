import React from 'react';
import { UserContext } from "../contexts/user.context";
import edit from "../edit_icon.png";
import save from "../save_icon.png";
import cancel from "../cancel_icon.png";

class ResultItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: props.user,
            isEditing: false
        };
    };

    uppercaseFirst = (name) => {
        let strings = name.split(' ');
        let returnString = '';
        strings.forEach(splitName => {
            returnString += splitName.charAt(0).toUpperCase() + splitName.slice(1) + ' ';
        });
        returnString = returnString.trim();
        return returnString;
    };

    editClick = () => {
        let user = JSON.parse(JSON.stringify(this.props.user));

        this.setState({
            userData: user,
            isEditing: true
        });
    };

    saveClick = () => {
        this.context.updateUser(this.state.userData);

        this.setState({
            isEditing: false
        });
    };

    cancelClick = () => {
        this.setState({
            isEditing: false,
            userData: JSON.parse(JSON.stringify(this.props.user))
        });
    };

    updateField = (event, fieldType) => {
        let user = this.state.userData;
        let country = '';

        switch(fieldType) {
            case 'firstName':
                user.name.first = event.target.value.toLowerCase();
                break;
            case 'lastName':
                user.name.last = event.target.value.toLowerCase();
                break;
            case 'city':
                user.location.city = event.target.value.toLowerCase();
                break;
            case 'state':
                user.location.state = event.target.value.toLowerCase();
                break;
            case 'email':
                user.email = event.target.value;
                break;
            default:
                break;
        }

        this.setState({
            userData: user,
            selectedCountry: country
        });
    };

    render() {
        return (
            <li>
                <div className='row card'>
                    <div className='nameSection'>
                        <div hidden={ this.state.isEditing }>
                            <button className='editButton' onClick={ this.editClick }>
                                <img className='editImg' src={ edit } alt='' />
                            </button>
                            <p className='name'>{ this.uppercaseFirst(this.props.user.name.first) } { this.uppercaseFirst(this.props.user.name.last) }</p>
                        </div>
                        <div className={ !this.state.isEditing ? '' : 'editNameSection'} hidden={ !this.state.isEditing }>
                            <button className='editButton' onClick={ this.saveClick }>
                                <img className='editImg' src={ save } alt='' />
                            </button>
                            <div className='editSpace'>
                                <input onBlur={(e) => this.updateField(e,'firstName')} onChange={(e) => this.updateField(e, 'firstName')} className='editField' type='text' value={ this.uppercaseFirst(this.state.userData.name.first) }/>
                                <input onBlur={(e) => this.updateField(e, 'lastName')} onChange={(e) => this.updateField(e, 'lastName')} className='editField' type='text' value={ this.uppercaseFirst(this.state.userData.name.last) }/>
                            </div>
                            <button className='editButtonRight' onClick={ this.cancelClick }>
                                <img className='editImg' src={ cancel } alt='' />
                            </button>
                        </div>
                    </div>
                    <div className='imageDiv'>
                        <img className='profileImg' src={ this.props.user.picture.large } alt='' />
                    </div>
                    <div hidden={ this.state.isEditing } className='infoSection'>
                        <p className='cardData'>{ this.props.user.email }</p>
                        <p className='cardData'>{ this.props.user.cell }</p>
                        <p className='cardData'>{ this.uppercaseFirst(this.props.user.location.city) }, { this.uppercaseFirst(this.props.user.location.state) }</p>
                    </div>
                    <div hidden={ !this.state.isEditing } className='editInfoSection'>
                        <form>
                            <div className='editInfoSpace'>
                                <input onBlur={(e) => this.updateField(e, 'email')} onChange={(e) => this.updateField(e, 'email')} className='editEmailField' type='text' value={ this.state.userData.email } />
                            </div>
                            <div className='editInfoSpace'>
                                <p className='cardEditData'>{ this.props.user.cell }</p>
                            </div>
                            <div className='editInfoSpace'>
                                <input onBlur={(e) => this.updateField(e, 'city')} onChange={(e) => this.updateField(e, 'city')} className='editField' type='text' value={ this.state.userData.location.city } />
                                <input onBlur={(e) => this.updateField(e, 'state')} onChange={(e) => this.updateField(e, 'state')} className='editField' type='text' value={ this.state.userData.location.state } />
                            </div>
                        </form>
                    </div>
                </div>
            </li>
        )
    };
}

ResultItem.contextType = UserContext;
export default ResultItem;