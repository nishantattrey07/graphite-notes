

import PropTypes from 'prop-types';

export function CodeElement(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

CodeElement.propTypes = {
attributes: PropTypes.object,
children: PropTypes.node,
element: PropTypes.shape({
type: PropTypes.string
})
};


