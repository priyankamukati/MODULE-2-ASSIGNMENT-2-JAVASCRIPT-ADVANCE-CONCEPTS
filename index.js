const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

const templateHTMLCustomer = fs.readFileSync(
  `${__dirname}/template/templateCustomer.html`,
  'utf-8'
);

function getLoanAmount(loanAmount, loanTermYears, interest) {
  const amountInFloat = parseFloat(loanAmount);
  const Accumulated = amountInFloat * parseFloat(loanTermYears) * parseFloat(interest) / 100;
  const amountOwed = amountInFloat + Accumulated;
  return amountOwed;
};

var customer1 = {
  id: 0,
  customerName: "Fred Wrenn",
  phoneNumber: "(206) 686-1350",
  address: "400 N Normandie Ave, San Francisco, CA 90010",
  loanAmount: "1000",
  interest: "6",
  loanTermYears: "5",
  loanType: "Student Loan",
  description: "Student loan for Fred Wrenn"
}

var customer2 = {
  id: 1,
  customerName: "James Mary",
  phoneNumber: "(206) 686-1351",
  address: "400 N Normandie Ave, San Diego, CA 90010",
  loanAmount: "2000",
  interest: "3",
  loanTermYears: "4",
  loanType: "Mortgage Loan",
  description: "Mortgage loan for James Mary"

}
var customer3 = {
  id: 2,
  customerName: "John Jennifer",
  phoneNumber: "(206) 686-1352",
  address: "400 N Normandie Ave, Boston, CA 90010",
  loanAmount: "3000",
  interest: "7",
  loanTermYears: "6",
  loanType: "Personal Loan",
  description: "Personal loan for John Jennifer"
}
var customer4 = {
  id: 3,
  customerName: "Robert Patricia",
  phoneNumber: "(206) 686-1353",
  address: "400 N Normandie Ave, New York, CA 90010",
  loanAmount: "6000",
  interest: "2",
  loanTermYears: "8",
  loanType: "Mortgage Loans",
  description: "Mortgage loan for Robert Patricia"
  
}
var customer5 = {
  id: 4,
  customerName: "Daniel Nancy",
  phoneNumber: "(206) 686-1354",
  address: "400 N Normandie Ave, Chicago, CA 90010",
  loanAmount: "8000",
  interest: "9",
  loanTermYears: "2",
  loanType: "Auto Loan",
  description: "Auto loan for Daniel Nancy"
}

var loans = [customer1, customer2, customer3, customer4, customer5];

customer1["calculatedLoanAmount"] = getLoanAmount(customer1.loanAmount, customer1.loanTermYears, customer1.interest);
customer2["calculatedLoanAmount"] = getLoanAmount(customer2.loanAmount, customer2.loanTermYears, customer2.interest);
customer3["calculatedLoanAmount"] = getLoanAmount(customer3.loanAmount, customer3.loanTermYears, customer3.interest);
customer4["calculatedLoanAmount"] = getLoanAmount(customer4.loanAmount, customer4.loanTermYears, customer4.interest);
customer5["calculatedLoanAmount"] = getLoanAmount(customer5.loanAmount, customer5.loanTermYears, customer5.interest);

console.log(loans);

const server = httpServer.createServer((req, res) => {

  const { query, pathname } = url.parse(req.url, true);
  if (query.id) {
    if (pathname === '/' || pathname.toLowerCase() === '/customers') {
      res.writeHead(200, {
        'Content-type': 'text/html'
      });

      const customer = loans[Number(query.id)];
      const customerHTML = replaceTemplate(templateHTMLCustomer, customer);
      res.end(customerHTML);
    }
  }
  else {
    res.writeHead(404, {
    });
    res.end(`resource not found`)
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening to requests on port 8000');
});

