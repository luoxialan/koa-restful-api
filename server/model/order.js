const database = require("../lib").db;
const constants = require("../config");

async function createOrder(order) {
    const { start_latitude, start_longtitude, end_latitude, end_longtitude, distance } = order;
    let sql = `insert into ord (start_latitude, start_longtitude, end_latitude, end_longtitude, distance ) values ('${start_latitude}', '${start_longtitude}', '${end_latitude}', '${end_longtitude}', '${distance}')`;
    return database.sqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return getOrder(res.insertId);
        } else {
            return { error: "Invalid Request" };
        }
    }).catch ( err => {
        return { error: err.message };
    })
}

async function getOrders(page, limit) {
    const from = page <= 1 ? 0 : (page * limit);
    const to = limit;
    let sql = `select id, distance, status from ord limit ${from}, ${to}`;
    return database.sqlAction(sql).then(res => {
        res.forEach(row => {
            const status = row['status'];
            row['status'] = constants.ORDER_STATUS[status];
        });
        return res;
    }).catch (err => {
        console.log(JSON.stringify(err));
        return { error: err.message };
    })
}

async function getOrder(id) {
    let sql = `select id, distance, status from ord where id = ${id}`;
    return database.sqlAction(sql).then(res => {
        res.forEach(row => {
            const status = row['status'];
            row['status'] = constants.ORDER_STATUS[status];
        });
        return res[0];
    }).catch (err => {
        throw err;
    })
}

async function takeOrder(id) {
    let sql = `select * from ord where id = ${id}`
    return database.sqlAction(sql).then(res => {
        if (res.length == 1 && res[0].status === 0 ) {
            return updateOrderStatus(id);
        } else {
            return { error: "Invalid Request" };
        }
    }).catch (err => {
        return { error: err.message };
    })
}

async function updateOrderStatus(id) {
    let sql = `update ord set status = 1 where id = ${id}`;
    return database.sqlAction(sql).then(res => {
        if (res.affectedRows == 1) {
            return { status: "SUCCESS" };
        } else {
            return { error: "Invalid Request" };
        }
    }).catch (err => {
        throw err;
    })
}

module.exports = {
    createOrder,
    getOrders,
    takeOrder
};