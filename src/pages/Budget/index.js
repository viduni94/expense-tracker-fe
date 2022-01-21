import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import ReactLogo from 'components/ReactLogo';
import { increment } from './budgetSlice';
import pageStyles from 'pages/pages.module.scss';
import styles from './budget.module.scss';

const Budget = () => {
  const count = useSelector(({ budget }) => budget.value);
  const dispatch = useDispatch();

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <ReactLogo onClick={() => dispatch(increment())} />
      <h2>Budget</h2>
      <div data-testid="count" hidden>
        {count}
      </div>
    </div>
  );
};

export default memo(Budget);
