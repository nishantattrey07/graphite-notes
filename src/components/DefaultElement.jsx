// DefaultElement.jsx

import PropTypes from 'prop-types';

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

DefaultElement.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  element: PropTypes.shape({
    type: PropTypes.string
  })
};

export default DefaultElement;
