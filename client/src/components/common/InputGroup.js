import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  info,
}) => {
  // const { name, placeholder, value, error, type, onChange, info } = props;
  return (
    <div className="input-group mb-3">
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        info={info}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;

// import React from 'react';
// import classnames from 'classnames';
// import PropTypes from 'prop-types';
//
// const InputGroup = ({
//   name,
//   placeholder,
//   value,
//   error,
//   icon,
//   type,
//   onChange,
// }) => {
//   console.log(props);
//   return (
//     <div className="input-group mb-3">
//       {/* <div className="input-group-prepend"> */}
//       {/* <span className="input-group-text">
//           <i className={icon} />
//         </span>
//       </div> */}
//       <input
//         className={classnames('form-control form-control-lg', {
//           'is-invalid': error,
//         })}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onChange={onChange}
//       />
//       {error && <div className="invalid-feedback">{error}</div>}
//     </div>
//   );
// };
//
// InputGroup.propTypes = {
//   name: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   icon: PropTypes.string,
//   error: PropTypes.string,
//   type: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
//
// InputGroup.defaultProps = {
//   type: 'text',
// };
//
// export default InputGroup;
