import { setFilter, resetFilter} from '../reducers/filterReducer';
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
      const newFilter = event.target.value;
      props.setFilter(newFilter);
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapDispatchToProps = { 
    setFilter, 
  }

  const ConnectedFilter = connect(
    null,
    mapDispatchToProps
  )(Filter)
  
  export default ConnectedFilter