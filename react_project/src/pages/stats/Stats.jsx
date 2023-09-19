import './stats.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { useContext } from 'react';


export function Stats() {

  const { user } = useContext(AuthContext);

  const [dailyOrdersOfMonth, setDailyOrdersOfMonth] = useState('');
  const [monthlyOrdersOfYear, setMonthlyOrdersOfYear] = useState('');
  const [yearlyOrders, setYearlyOrders] = useState('');
  const [todayOrders, setTodayOrders] = useState('');
  const [monthOrders, setMonthOrders] = useState('');
  const [yearOrders, setYearOrders] = useState('');
  const [dayRevenue, setDayRevenue] = useState('');
  const [monthRevenue, setMonthRevenue] = useState('');
  const [monthRevenueChart, setMonthRevenueChart] = useState('');
  const [yearRevenue, setYearRevenue] = useState('');
  const [yearRevenueChart, setYearRevenueChart] = useState('');
  const [booksCount, setBooksCount] = useState('');
  const [usersCount, setUsersCount] = useState('');


  const getStats = async () => {
    try {
      const stats = await axios.get('/stats');
      setDailyOrdersOfMonth(stats.data.daily_orders_of_month);
      setMonthlyOrdersOfYear(stats.data.monthly_orders_of_year);
      setYearlyOrders(stats.data.yearly_orders);
      setTodayOrders(stats.data.daily_orders_of_month[stats.data.daily_orders_of_month.length - 1]['order']);
      setMonthOrders(stats.data.monthly_orders_of_year[stats.data.monthly_orders_of_year.length - 1]['order']);
      setYearOrders(stats.data.yearly_orders[stats.data.yearly_orders.length - 1]['order']);
      setDayRevenue(stats.data.day_revenue[0]['revenue']);
      setMonthRevenue(stats.data.monthly_revenue[stats.data.monthly_revenue.length - 1]['revenue']);
      setMonthRevenueChart(stats.data.monthly_revenue);
      setYearRevenue(stats.data.yearly_revenue[stats.data.yearly_revenue.length - 1]['revenue']);
      setYearRevenueChart(stats.data.yearly_revenue);
      setBooksCount(stats.data.books_count[0]['books_count']);
      setUsersCount(stats.data.users_count[0]['users_count'])
      console.log(stats.data.books_count[0]['books_count'])
      // console.log(yearlyOrders);
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getStats();
    // getRevenue();
  }, [])

  return (
    <>
      <div className="main">
        {user?.user?.isAdmin == true ?
          <div className="stats">
            <div className="statsTop">
              <div className="statsWrapper">
                <div className="statItems">
                  <div className="statItemsLabel">Today</div>
                  <div className="statItemsCount">{todayOrders}</div>
                </div>
                <div className="statItems">
                  <div className="statItemsLabel">Month</div>
                  <div className="statItemsCount">{monthOrders}</div>
                </div>
                <div className="statItems">
                  <div className="statItemsLabel">Year</div>
                  <div className="statItemsCount">{yearOrders}</div>
                </div>
                <div className="statItems">
                  <div className="statItemsLabel">Books</div>
                  <div className="statItemsCount">{booksCount}</div>
                </div>
                <div className="statItems">
                  <div className="statItemsLabel">Users</div>
                  <div className="statItemsCount">{usersCount}</div>
                </div>
              </div>
              <div className="statsWrapper">

                <div className="statItems">
                  <div className="statItemsLabel">Daily Revenue</div>
                  <div className="statItemsCount">{`$ ${dayRevenue}`}</div>
                </div>
                <div className="statItems">
                  <div className="statItemsLabel">Monthly Revenue</div>
                  <div className="statItemsCount">{`$ ${monthRevenue}`}</div>
                </div>
                <div className="statItems">
                  <div className="statItemsLabel">Yearly Revenue</div>
                  <div className="statItemsCount">{`$ ${yearRevenue}`}</div>
                </div>
              </div>
            </div>
            <div className="chart">
              <div className="chartLabel" style={{ color: '#8884d8' }}>Daily Sales</div>
              <ResponsiveContainer width="99%" aspect={4 / 1}>
                <LineChart data={dailyOrdersOfMonth}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="order" stroke="#8884d8" strokeWidth={1.7} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart">
              <div className="chartLabel" style={{ color: '#d284d8' }}>Monthly Sales</div>
              <ResponsiveContainer width="99%" aspect={4 / 1}>
                <LineChart data={monthlyOrdersOfYear}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="order" stroke="#d284d8" strokeWidth={1.5} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>


            <div className="chart">
              <div className="chartLabel" style={{ color: '#d284d8' }}>Monthly Revenue</div>
              <ResponsiveContainer width="99%" aspect={4 / 1}>
                <LineChart data={monthRevenueChart}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#d284d8" strokeWidth={1.5} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart">
              <div className="chartLabel" style={{ color: '#d88484' }}>Yearly Sales</div>
              <ResponsiveContainer width="99%" aspect={4 / 1}>
                <LineChart data={yearlyOrders}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="order" stroke="#d88484" strokeWidth={1.5} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>


            <div className="chart">
              <div className="chartLabel" style={{ color: '#d88484' }}>Yearly Revenue</div>
              <ResponsiveContainer width="99%" aspect={4 / 1}>
                <LineChart data={yearRevenueChart}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#d88484" strokeWidth={1.5} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
          : <div>You're not authorized to see this page!</div>}
      </div>
    </>
  );
}