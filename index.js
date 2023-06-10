// Helper functions
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour, 10),
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour, 10),
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);
  return datesWorked.reduce(
    (totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date),
    0
  );
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (totalPayroll, employeeRecord) =>
      totalPayroll + allWagesFor(employeeRecord),
    0
  );
}

// Tests
describe("The payroll system", function () {
  describe("populates a record from an Array", function () {
    it("has a function called createEmployeeRecord", function () {
      expect(createEmployeeRecord).to.exist;
    });

    describe("createEmployeeRecord", function () {
      it("populates a firstName field from the 0th element", function () {
        let testEmployee = createEmployeeRecord([
          "Gray",
          "Worm",
          "Security",
          1,
        ]);
        expect(testEmployee.firstName).to.eq("Gray");
      });

      // ... other test cases ...
    });
  });

  // ... other describe blocks and test cases ...
});
