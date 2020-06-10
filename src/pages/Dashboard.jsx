import React , {useState,useEffect} from 'react';
import List from '../components/List';
import Card from '../components/Card';
import moment from 'moment'
import {calculateAmount , calculateRecurring} from '../helpers/helper';


const Dashboard = () => {

  const date = new Date();

  const [list, setList] = useState()
  const [income , setIncome] = useState(0)
  const [expense , setExpense] = useState(0)
  const [recurringPayment , setRecurringPayment] = useState(0)


  const fetchTransactionRecordList = async() => {
    const record = await (await fetch(`${process.env.REACT_APP_ENDPOINT}api/transaction-record/${moment(date).format('YYYY-MM-DD')}`)).json()
    if(record.status){
        const totalIncome = calculateAmount(record.data[0].transaction,"Income");
        const totalExpenses = calculateAmount(record.data[0].transaction,"Expenses");
        const totalRecurring = calculateRecurring(record.data[0].recurringPayment);
        setIncome(totalIncome)
        setExpense(totalExpenses)
        setRecurringPayment(totalRecurring)
      }
      setList(record.data) 
  }
  
  useEffect(() => {
    fetchTransactionRecordList()
  },[income,expense])
  
  console.log(list)
  return (
    <div className="mb-100 bg-white-500 h-screen leading-normal px-2 pt-2">
      <div className="grid grid-cols-3 gap-4 mx-2">
        <div>
          <h className="text-xl font-black uppercase">{moment(date).format('MMMM')}</h><span></span>
        </div>
        <div>
          <p className="text-xl font-black uppercase text-center">
            <a href="/filter">Filter</a>
          </p>
        </div>
        <div>
          <p className="text-xl font-black uppercase text-right">
            <a href="/setting">Setting</a>
          </p>
        </div>
      </div>

      <div className="flex flex-col rounded-lg p-6 m-2 bg-blue-400 shadow-2xl">
        <Card value={`$${income-expense-recurringPayment}`} title={"Balance"} detail={"Your Current Balance"}/>
      </div>
      <div className="flex flex-col rounded-lg p-6 m-2 bg-teal-400 shadow-2xl">
        <Card value={`$${recurringPayment}`} title={"Monthly Recurring Payment"} detail={"Total Recurring Payment"}/>
      </div>

      <div class="grid grid-cols-2">
        <div className="flex flex-col rounded-lg p-6 m-2 bg-purple-400 shadow-2xl">
          <Card value={`$${income}`} title={"Income"} detail={"Total Income"}/>
        </div>
        <div className="flex flex-col rounded-lg p-6 m-2 bg-pink-400 shadow-2xl">
          <Card value={`$${expense + recurringPayment}`} title={"Expense"} detail={"Total Expense + Recurring"}/>
        </div>
      </div>

      <List data={list} totalIncome={income} totalExpenses={expense} balance={income-expense}/>

      <div className="flex justify-center">
        <footer class="mb-20 h-10 fixed bottom-0">
          <div class="rounded-full bg-orange-300 h-16 w-16 flex items-center justify-center ">
              <a href="/add-record"><button className="text-2xl text-white focus:outline-none">+</button></a>
          </div>
        </footer>
      </div>

    </div>
  );
}

export default Dashboard;
