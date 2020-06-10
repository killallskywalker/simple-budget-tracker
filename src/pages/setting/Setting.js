import React , {useState , useEffect} from 'react';
import useFillForm from '../../hooks/FormHooks';
import NotFound from '../../components/NotFound';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'

const Setting = () => {

  const alert = useAlert()
  const {inputs, handleInputChange, handleSubmit} = useFillForm();
  const [recurringPaymentList, setRecurringPaymentList] = useState();
  const [newRecurringPaymentList, setNewRecurringPaymentList] = useState();
  const [deletedRecurringPaymentList, setDeletedRecurringPaymentList] = useState();

  const addRecurringPayment = async() => {
    try{
      let response = await  fetch(`${process.env.REACT_APP_ENDPOINT}/api/recurring-payment`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json; charset=UTF-8'
        },
        body: JSON.stringify(inputs)
      })

      let data = await response.json()
        
      if(response.status === 200){
        alert.show(data.message , {type:types.SUCCESS})
        setNewRecurringPaymentList(data.data)
      }

    }catch {
      alert.show('Unexpected error happens!' , {type:types.ERROR})
    }

  }

  const deleteRecurringPayment = async(subscriptionId) => {
    try{

      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}api/recurring-payment/` + subscriptionId ,{
        method: 'DELETE',
      });

      if(response.status === 204){
        alert.show('Recurring payment successfully deleted',{type:types.SUCCESS})
        setDeletedRecurringPaymentList(subscriptionId)
      }else{
        alert.show("Delete failed!",{type:types.ERROR})
      }

    }catch (error){
      console.log(error)
      alert.show('Unexpected error happens!' , {type:types.ERROR})
    }
  }

  const fetchRecurringPaymentList = async() => {
    const result = await (await fetch(`${process.env.REACT_APP_ENDPOINT}api/recurring-payment`)).json()
    if(result){
      setRecurringPaymentList(result)
    }
  }

  useEffect(() => {
    fetchRecurringPaymentList()
  },[newRecurringPaymentList,deletedRecurringPaymentList])

  const ListSubscription = () => {
    if(recurringPaymentList && recurringPaymentList.data){
      return (
        recurringPaymentList.data.map((item,key) => (
          <div className="rounded-lg bg-white flex py-2 mx-2 my-2 shadow-2xl">
          <div className="flex-grow text-left text-green-900 mx-3">
              <span> {item.subscriptionName} - ${item.total}</span>
          </div>
          <div class="rounded bg-red-500 p-1 flex items-center justify-center text-white mx-2">
              <button className="focus:outline-none" onClick={() => deleteRecurringPayment(item._id)}>Delete</button>
          </div>
          <hr className="border-0 bg-gray-500 text-gray-500 h-px"></hr>
        </div>  
      )
      ))
    }
    else{
      return(
        <div className="m-10">
          <NotFound/>
        </div>
      )
    }
  }

  return(
    <div className="mb-100 bg-white-500 h-screen leading-normal px-2 pt-2">
      <div class="grid grid-cols-2 gap-4 mx-2">
        <div>
            <a href="/dashboard" className="text-left">Back</a><span></span>
        </div>
      </div>
      <div class="flex flex-col rounded-lg bg-white p-6 m-2 shadow-2xl">
        <h1 class="block w-full text-center text-grey-darkest mb-6">Add Recurring Payment</h1>
        <h1 class="block w-full text-center text-grey-darkest mb-6">At the moment only support monthly recurring payment</h1>
        <form class="mb-4" onSubmit={handleSubmit}>
          <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="total">Amount</label>
            <input class="border py-2 px-3 text-grey-darkest" type="number" name="total" id="total" onChange={handleInputChange} value={inputs.total} required></input>
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="subscriptionName">Recurring Payment Name</label>
            <input class="border py-2 px-3 text-grey-darkest" type="text" name="subscriptionName" id="subscriptionName" onChange={handleInputChange} value={inputs.subscriptionName} required></input>
          </div>
          <div class="rounded bg-orange-300 p-4 flex items-center justify-center text-white mb-2">
              <button className="focus:outline-none" onClick={addRecurringPayment}>Set Recurring Payment</button>
          </div>
        </form>
      </div>
      <ListSubscription/>
      </div>
  );
}

export default Setting;
