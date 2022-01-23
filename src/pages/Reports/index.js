import { memo, useEffect, useState } from 'react';
import cx from 'classnames';
import pageStyles from 'pages/pages.module.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGetTotalPerCategoryQuery } from '../../services/reports';
import styles from './reports.module.scss';

const Reports = () => {
  const [overallBudget, setOverallBudget] = useState(0);
  const [overallExpenses, setOverallExpenses] = useState(0);

  const { data } = useGetTotalPerCategoryQuery();

  useEffect(() => {
    if (data && data.length) {
      setOverallBudget(data.reduce((budget, current) => budget + current.budget, 0));
      setOverallExpenses(data.reduce((expenses, current) => expenses + current.expense, 0));
    }
  }, [data]);

  return (
    <div className={cx(pageStyles.container, styles.main)}>
      <h3>Budget vs Expenses per Category</h3>
      <BarChart width={730} height={250} data={data} className={styles.chart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" />
        <Bar dataKey="expense" fill="#82ca9d" />
      </BarChart>
      <h3 className={styles.overallGraphTitle}>Overall budget vs Overall Expenses</h3>
      <BarChart
        width={730}
        height={250}
        className={styles.chart}
        data={[{ name: 'All Categories', overallBudget, overallExpenses }]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="overallBudget" fill="#8884d8" />
        <Bar dataKey="overallExpenses" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default memo(Reports);
