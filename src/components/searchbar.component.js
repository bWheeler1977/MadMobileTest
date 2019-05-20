import React from 'react';

class Searchbar extends React.Component {
    state = {
        searchText: '',
        sortOrder: '',
        sortOrders: ['First Name - ascending', 'First Name - descending', 'Last Name - ascending', 'Last Name - descending',
            'City - ascending', 'City - descending', 'State - ascending', 'State - descending']
    };

    handleChange = (event) => {
        this.setState({
            searchText: event.target.value
        });
        this.props.setFilter(event.target.value);
    };

    updateSort = (event) => {
        this.setState( {
            sortOrder: event.target.value
        });
        this.props.setSort(event.target.value);
    };

    render() {
        return (
            <div className='search-bar'>
                <form className='ui form'>
                    <div className='column'>
                        <label htmlFor='user-search'>User search     </label>
                        <input className='editField' onChange={ this.handleChange } name='user-search' type='text' placeholder='Filter users by name' value={ this.state.searchText }/>
                    </div>
                    <div className='column'>
                        <label htmlFor='user-sort'>Sort by     </label>
                        <select id='sortBy' value={ this.state.sortOrder } onChange={ this.updateSort } >
                            <option value=''>Choose...</option>
                            { this.state.sortOrders.map(order => (
                                <option key={ order } value={ order.replace(' - ', '').replace(' ', '').toLowerCase() }>
                                    { order }
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>
        );
    };
}

export default Searchbar;