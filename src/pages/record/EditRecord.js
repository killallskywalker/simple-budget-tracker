import React , {useState , useEffect} from 'react';
import NotFound from '../../components/NotFound';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'
import moment from 'moment'


const EditRecord = () => {

  const alert = useAlert()

  let { dailyTransactionId } = useParams();

  const [dailyTransaction, setDailyTransaction] = useState();

  const [monthlyTransactionId , setMonthlyTransactionId] = useState();

  const fetchSpecificDailyTransaction = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}api/transaction-record/daily/${dailyTransactionId}`)
      
      let data = await response.json()
      if(response.status === 200){
          alert.show(data.message , {type:types.SUCCESS})
          setDailyTransaction(data.data)
          setMonthlyTransactionId(data.data._id)
        }
        else if(response.status === 404){
            console.log(dailyTransaction);
            alert.show(data.message , {type:types.ERROR})
        }
      }catch(error){
        console.log(error)
        alert.show('Unexpected error happens!' , {type:types.ERROR})
    }
  }

  const deleteTransaction = async(event) => {
    event.preventDefault();
    try{
      console.log('a')
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/api/${monthlyTransactionId}/${dailyTransactionId}`,{
        method: 'DELETE',
      });
      
      if(response.status === 204){
          alert.show('Transaction successfully deleted',{type:types.SUCCESS})
          setTimeout(()=> {
            window.location.pathname = '/dashboard';
         }, 1000)
        }else{
          console.log(response);
          alert.show("Delete failed!",{type:types.ERROR})
        }
  
      }catch (error){
        console.log(error)
        alert.show('Unexpected error happens!' , {type:types.ERROR})
    }
  }

  useEffect(() => {
    fetchSpecificDailyTransaction()
  },[])

  if(dailyTransaction){
    return(
      <div className="mb-100 bg-white-500 h-screen leading-normal px-2 pt-2">
        <div class="grid grid-cols-2 gap-4 mx-2">
          <div>
          <a href="/dashboard" className="text-left">Back</a><span></span>
          </div>
        </div>
        <div class="flex flex-col rounded-lg bg-white p-6 m-2 shadow-2xl">
          <h1 class="block w-full text-center text-grey-darkest mb-1">Edit Expenses Transaction For</h1>
          <h1 class="block w-full text-center text-grey-darkest mb-1">{moment(dailyTransaction.transaction[0].date).format('DD MMMM YYYY')}</h1>
          <form class="mb-4 ">
            <div class="flex flex-col mb-4">
              <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="amount">Amount</label>
                <input class="border py-2 px-3 text-grey-darkest" type="text" name="amount" id="amount" value={dailyTransaction.transaction[0].total} readOnly></input>
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="last_name">Expense Type</label>
              <input class="border py-2 px-3 text-grey-darkest" type="text" name="amount" id="amount" value={dailyTransaction.transaction[0].transactionType} readOnly></input>
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="category">Category</label>
              <input class="border py-2 px-3 text-grey-darkest" type="text" name="category" id="category" value={dailyTransaction.transaction[0].category} readOnly></input>
            </div>
            <div class="flex flex-col mb-6">
              <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="memo">Memo</label>
              <input class="border py-2 px-3 text-grey-darkest" type="text" name="memo" id="memo" value={dailyTransaction.transaction[0].memo} readOnly></input>
            </div>
            <div class="rounded bg-red-300 p-4 flex items-center justify-center text-white">
                <button className="focus:outline-none" onClick={deleteTransaction}>Delete Record</button>
            </div>
          </form>
        </div>
      </div>
    );
  }else{
    return (
      <div className="mb-100 bg-white-500 h-screen leading-normal px-2 pt-2">
      <div class="grid grid-cols-2 gap-4 mx-2">
        <div>
        <a href="/dashboard" className="text-left">Back</a><span></span>
        </div>
      </div>
      <div className="w-full h-12 my-8">        
        <NotFound/>
        </div>
      </div>
    )
  }
}

export default EditRecord;
