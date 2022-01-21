import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import ReactLogo from 'components/ReactLogo';
import { increment } from './spendingSlice';
import pageStyles from 'pages/pages.module.scss';
import styles from './spending.module.scss';

const Spending = () => {
  const count = useSelector(({ spending }) => spending.value);
  const dispatch = useDispatch();

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <ReactLogo onClick={() => dispatch(increment())} />
      <h2>Spending</h2>
      <div data-testid="count" hidden>
        {count}
      </div>
    </div>
  );
};

export default memo(Spending);
