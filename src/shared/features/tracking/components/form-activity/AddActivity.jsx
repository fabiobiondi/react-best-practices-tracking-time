import React from 'react';
import PropTypes from 'prop-types';

class AddActivity extends React.Component {

  constructor(props) {
    super(props);
    // populate form when initialized
    this.state = {
      active: {...props.active}
    }
  }

  componentDidUpdate(prevProps) {
    // Update only when active changes from parent
    const active = this.props.active;
    if (active !== prevProps.active) {
      this.setState({ active })
    }
  }

  onChange(event, field) {
    const active = {
      ...this.state.active,
      [field]: event.target.value
    };
    this.setState({ active })
  }

  submit(e) {
    e.preventDefault();
    this.props.onSaveActivity(this.state.active);
  };

  render() {
    const { active: { id, text, type = '', duration = 0} } = this.state;
    const { onResetActive } = this.props;
    const label = id ? 'EDIT' : 'ADD';

    return (
      <form
        onSubmit={(e) => this.submit(e)} noValidate
      >
        <input type="text" name="text"
               className="form-control mb-1"
               placeholder="Activity Description"
               value={text}
               onChange={(e) => this.onChange(e, 'text')}
        />

        <div className="row mb-1">
          <div className="col">
            <select
              name="type"
              className="form-control"
              value={type}
              onChange={(e) => this.onChange(e, 'type')}
            >
              <option value="">nothing</option>
              <option value="meeting">meeting</option>
              <option value="development">development</option>
              <option value="study">study</option>
            </select>
          </div>
          <div className="col">
            <input type="number" name="duration"
                   className="form-control"
                   placeholder="Duration (in minutes)"
                   value={duration}
                   onChange={(e) => this.onChange(e, 'duration')}
            />
          </div>
        </div>



        <div className="btn-group btn-group-sm mt-1">
          <button type="submit" className="btn btn-warning">{label}</button>
          <button type="button" className="btn btn-light"
            onClick={() => onResetActive()}>RESET</button>
        </div>
      </form>
    )
  }

}


AddActivity.propTypes = {
  active: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    creationDate: PropTypes.number,
    type: PropTypes.string
  }),
  onSaveActivity: PropTypes.func.isRequired,
  onResetActive: PropTypes.func
};

AddActivity.defaultProps = {
  active: {
    text: ''
  }
};

export default AddActivity;
