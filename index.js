function createEmployeeRecord([strFirstName, strFamilyName, strTitle, numPayPerHour]) {
    let obj = {
        firstName : strFirstName,
        familyName : strFamilyName,
        title : strTitle,
        payPerHour : numPayPerHour,
        timeInEvents : [],
        timeOutEvents : []
    }
    return obj
};

function createEmployeeRecords(employeeRecords) {
    let records = []
    employeeRecords.forEach(element => {
        records.push(createEmployeeRecord(element))
    });
    return records 
};

function createTimeInEvent(record, dateStamp = "2023-06-21 0000") {
    let obj = {
        type : 'TimeIn',
        hour : Number(dateStamp.slice(11)),
        date : dateStamp.slice(0,10)
    }
    record.timeInEvents.push(obj)
    return record
};

function createTimeOutEvent(record, dateStamp = "2023-06-21 0800") {
    let obj = {
        type : 'TimeOut',
        hour : Number(dateStamp.slice(11)),
        date : dateStamp.slice(0,10)
    }
    record.timeOutEvents.push(obj)
    return record
};

function hoursWorkedOnDate(record, date = "YYYY-MM-DD") {
    //console.log(record)
    //console.log(date)
    for (let i = 0; i < record.timeInEvents.length; i++) {
        //console.log(record.timeInEvents[i])
        if (record.timeInEvents[i].date === date) {
            const timeIn = record.timeInEvents[i].hour
            const timeOut = record.timeOutEvents[i].hour
            let hoursWorked = (timeOut - timeIn)/100
            return hoursWorked
        } else continue
      }
};

function wagesEarnedOnDate(record, date = "YYYY-MM-DD") {
    let rate = record.payPerHour
    let hours = hoursWorkedOnDate(record, date)
    let payOwed = rate * hours
    return payOwed
};

function allWagesFor(record) {
    let workedDates = []
    let payOwedForAllDates = 0
    for (let i = 0; i < record.timeInEvents.length; i++) {
        workedDates.push(record.timeInEvents[i]['date'])
    }
    for (let i = 0; i < workedDates.length; i++) {
        let date = workedDates[i]

        payOwedForAllDates += (wagesEarnedOnDate(record, date))
    }
    return payOwedForAllDates
};

function calculatePayroll(employeeRecords) {
    let payroll = 0
    for (let i = 0; i < employeeRecords.length; i++) {
        let record = employeeRecords[i]
        payroll += allWagesFor(record)
    }
    return payroll
};
