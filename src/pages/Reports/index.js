import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import ReactLogo from 'components/ReactLogo';
import { increment } from './reportsSlice';
import pageStyles from 'pages/pages.module.scss';
import styles from './reports.module.scss';

const Reports = () => {
  const count = useSelector(({ reports }) => reports.value);
  const dispatch = useDispatch();

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <ReactLogo onClick={() => dispatch(increment())} />
      <h2>Reports</h2>
      <div data-testid="count" hidden>
        {count}
      </div>
    </div>
  );
};

export default memo(Reports);
