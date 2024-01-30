import React from 'react';
import classNames from 'classnames';

import './button.scss';

interface Props {
  children: any | null;
  onClick?: () => void | null;
  onMouseDown?: () => void | null;
  onMouseUp?: () => void | null;
  className?: string | null;
  form?: string | null;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean | null;
}

const Button = ({ children, className, ...rest }: Props): React.React.JSX.Element =>
    <button className={classNames('btn', className || '')} {...rest}>
      {children}
    </button>;

export default Button;
