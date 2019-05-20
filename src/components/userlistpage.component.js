import React from 'react';
import { UserContext } from '../contexts/user.context';
import SearchBar from './searchbar.component';
import ResultList from './resultlist.component';

class UserListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayedUsers: [],
            isFilteredOrSorted: false
        };
    }

    filterList = (filterText) => {
        this.setState({
            displayedUsers: this.context.users.filter(user => user.name.first.includes(filterText) || user.name.last.includes(filterText)),
            isFilteredOrSorted: true
        });
    };

    sortList = (sortType) => {
        switch(sortType) {
            case 'firstnameascending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.name.first.toLowerCase() < b.name.first.toLowerCase()) { return -1; }
                        if(a.name.first.toLowerCase() > b.name.first.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'firstnamedescending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.name.first.toLowerCase() > b.name.first.toLowerCase()) { return -1; }
                        if(a.name.first.toLowerCase() < b.name.first.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'lastnameascending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.name.last.toLowerCase() < b.name.last.toLowerCase()) { return -1; }
                        if(a.name.last.toLowerCase() > b.name.last.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'lastnamedescending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.name.last.toLowerCase() > b.name.last.toLowerCase()) { return -1; }
                        if(a.name.last.toLowerCase() < b.name.last.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'cityascending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.location.city.toLowerCase() < b.location.city.toLowerCase()) { return -1; }
                        if(a.location.city.toLowerCase() > b.location.city.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'citydescending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.location.city.toLowerCase() > b.location.city.toLowerCase()) { return -1; }
                        if(a.location.city.toLowerCase() < b.location.city.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'stateascending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.location.state.toLowerCase() < b.location.state.toLowerCase()) { return -1; }
                        if(a.location.state.toLowerCase() > b.location.state.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            case 'statedescending':
                this.setState( {
                    displayedUsers: this.context.users.slice(0).sort((a,b) => {
                        if(a.location.state.toLowerCase() > b.location.state.toLowerCase()) { return -1; }
                        if(a.location.state.toLowerCase() < b.location.state.toLowerCase()) { return 1; }
                        return 0;
                    }),
                    isFilteredOrSorted: true
                });
                break;
            default:
                this.setState({
                    displayedUsers: this.context.users,
                    isFilteredOrSorted: false
                });
                break;
        }
    };

    render() {
        return (
            <div id='listPageComponent'>
                <div id='search'>
                    <SearchBar setFilter={ this.filterList.bind(this) } setSort={ this.sortList.bind(this) } />
                </div>
                <div id='userList'>
                    <ResultList theList={ this.state.isFilteredOrSorted ? this.state.displayedUsers : this.context.users }/>
                </div>
            </div>
        )
    };
}

UserListPage.contextType = UserContext;
export default UserListPage;