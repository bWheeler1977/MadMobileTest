import React from 'react';
import { UserContext } from '../contexts/user.context';
import ResultItem from './resultitem.component';

class ResultList extends React.Component {
    clickMore = () => {
        this.context.getNextPage();
    };

    render() {
        if (this.context.error) {
            return (
                <p>{ this.context.error.message }</p>
            );
        }
        if (this.context.isLoading) {
            return (
                <p>Loading...</p>
            );
        }
        return (
            <div>
                <h2>User List</h2>
                <div id='resultListBody'>
                    <ul id='userList'>
                        { this.props.theList.map(user =>
                            <ResultItem user={ user } key={ user.dob.date } />
                        )}
                    </ul>
                    <div>
                        <button type='button' onClick={ this.clickMore }>Click for more users!</button>
                    </div>
                </div>
            </div>
        )
    }
}

ResultList.contextType = UserContext;
export default ResultList;