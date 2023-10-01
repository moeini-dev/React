const db = require('../models');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

// const getDailyOrders = async () => {

//   console.log('===== Now: ', moment().toDate());
//   console.log('===== start of the month: ', moment().clone().startOf('month').toDate());

//   try {
//     const daily_orders = await db.order.findAll({
//       where: {
//         createdAt: {
//           [Op.gte]: moment().clone().subtract(1, 'days').toDate()
//         }

//       },
//       attributes: {
//         exclude: ['userUuid', 'id', 'status', 'createdAt', 'updatedAt', 'amount', 'bookIsbn'],
//         include: [
//           [sequelize.fn('COUNT', sequelize.col('id')), 'daily_orders']
//         ]
//       }
//     })

//     return daily_orders[0];
//   } catch (err) { console.log('Error: ', err) }
// }



const getDailyOrdersOfMonth = async () => {
  let daily_orders_of_month = [];
  const monthStart = moment().clone().startOf('month');

  console.log('##################', monthStart)

  while (monthStart < moment().clone()) {
    await db.order.count({
      where: {
        createdAt: {
          [Op.and]: [
            { [Op.gte]: monthStart.clone().startOf('day') },
            { [Op.lte]: monthStart.clone().endOf('day') },
          ]
        },
        status: 'succeed'
      }
    })
      .then(result => {
        console.log('===== result: ', result)
        console.log('+++++= This is day: ', monthStart.clone().format('ddd'))
        daily_orders_of_month.push({ day: monthStart.clone().format('DD'), order: result })
      })
      .catch(err => console.log('==== Error: ', err))

    monthStart.add(1, 'days')
  }

  return daily_orders_of_month;

}


const getMonthlyOrdersOfYear = async () => {
  let monthly_orders_of_year = [];
  const yearStart = moment().clone().startOf('year');

  while (yearStart < moment().clone()) {
    await db.order.count({
      where: {
        createdAt: {
          [Op.and]: [
            { [Op.gte]: yearStart.clone().startOf('month') },
            { [Op.lte]: yearStart.clone().endOf('month') }
          ]
        },
        status: 'succeed'
      }
    })
      .then(result => {
        console.log(`==== ${yearStart.clone().format('MMM')}`, result)
        // monthly_orders_of_year.push(result)
        monthly_orders_of_year.push({ month: yearStart.clone().format('MMM'), order: result });
      })
      .catch(err => console.log('==== Error: ', err))

    yearStart.add(1, 'month')
  }

  return monthly_orders_of_year;
}


const getYearlyOrders = async () => {

  let yearly_orders = [];
  const yearStart = moment().clone().endOf('year');

  for (let i = 4; i >= 0; i--) {

    await db.order.count({
      where: {
        createdAt: {
          [Op.lte]: moment().clone().endOf('year').subtract(i, 'years')
        },
        status: 'succeed'

      }
    })
      .then(result => yearly_orders.push({ year: moment().clone().endOf('year').subtract(i, 'years').format('YYYY'), order: result }))
      .catch(err => console.log('===== Error: ', err))
  }

  return yearly_orders;
}


const getDaySumRevenue = async () => {
  let day_revenue = [];

  console.log('+++++++++++++ start: ', moment().clone().startOf('day'))
  console.log('+++++++++++++ end: ', moment().clone().endOf('day'))

  await db.order.sum('amount', {
    where: {
      createdAt: {
        [Op.and]: [
          { [Op.gte]: moment().clone().startOf('day') },
          { [Op.lte]: moment().clone().endOf('day') }
        ]
      },
      status: 'succeed'

    }
  })
    .then(result => {
      day_revenue.push({ revenue: (result !== null ? result : 0) })
      console.log(moment().clone().startOf('day').toDate())
    })
    .catch(err => console.log(err))

  return day_revenue;
}



const getMonthlyRevenue = async () => {
  let monthly_revenue = [];
  const yearStart = moment().clone().startOf('year');

  while (yearStart < moment().clone()) {
    await db.order.sum('amount', {
      where: {
        createdAt: {
          [Op.and]: [
            { [Op.gte]: yearStart.clone().startOf('month') },
            { [Op.lte]: yearStart.clone().endOf('month') }
          ]
        },
        status: 'succeed'
      }
    })
      .then(result => {
        console.log(`==== ${yearStart.clone().format('MMM')}`, result)
        // monthly_orders_of_year.push(result)
        monthly_revenue.push({ month: yearStart.clone().format('MMM'), revenue: (result !== null ? result : 0) });
      })
      .catch(err => console.log('==== Error: ', err))

    yearStart.add(1, 'month')
  }

  return monthly_revenue;
}


const getYearlyRevenue = async () => {

  let yearly_revenue = [];
  const yearStart = moment().clone().endOf('year');

  for (let i = 4; i >= 0; i--) {

    await db.order.sum('amount', {
      where: {
        createdAt: {
          [Op.lte]: moment().clone().endOf('year').subtract(i, 'years')
        },
        status: 'succeed'

      }
    })
      .then(result => yearly_revenue.push({ year: moment().clone().endOf('year').subtract(i, 'years').format('YYYY'), revenue: (result !== null ? result : 0) }))
      .catch(err => console.log('===== Error: ', err))
  }

  return yearly_revenue;
}


const getBooksCount = async () => {
  let booksCount = [];
  await db.book.count('isbn')
    .then(result => booksCount.push({ books_count: result }))
    .catch(err => console.log('===== Error: ', err))

  return booksCount;
}


const getUsersCount = async () => {
  let usersCount = [];
  await db.user.count('isbn')
    .then(result => usersCount.push({ users_count: result }))
    .catch(err => console.log('===== Error: ', err))

  return usersCount;
}



const getAllStats = async (req, res) => {

  const daily_orders_of_month = await getDailyOrdersOfMonth();
  const monthly_orders_of_year = await getMonthlyOrdersOfYear();
  const yearly_orders = await getYearlyOrders();
  const day_revenue = await getDaySumRevenue();
  const monthly_revenue = await getMonthlyRevenue();
  const yearly_revenue = await getYearlyRevenue();
  const books_count = await getBooksCount();
  const users_count = await getUsersCount();

  res.json({
    daily_orders_of_month,
    monthly_orders_of_year,
    yearly_orders,
    day_revenue,
    monthly_revenue,
    yearly_revenue,
    books_count,
    users_count
  })

}

module.exports = {
  getAllStats
}