import React from 'react';
import useFillForm from '../../hooks/FormHooks';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'

const AddRecord = () => {

  const alert = useAlert()

  const {inputs, handleInputChange, handleSubmit} = useFillForm();

  const addDailyRecord = async() => {
    console.log('a')
    try{
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}api/transaction-record`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json; charset=UTF-8'
        },
        body: JSON.stringify(inputs)
      })

      let data = await response.json()
        
      if(response.status === 200){
        alert.show(data.message , {type:types.SUCCESS})
        setTimeout(()=> {
          window.location.pathname = '/dashboard';
       }, 1000)
      }
      else if(response.status === 422){
        alert.show("Ensure you fill all input with correct data" , {type:types.ERROR})
      }
    }catch {
      alert.show('Unexpected error happens!' , {type:types.ERROR})
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
        <h1 class="block w-full text-center text-grey-darkest mb-1">Add Expenses</h1>
        <form class="mb-4" onSubmit={handleSubmit}>
          <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="total">Total</label>
            <input class="border py-2 px-3 text-grey-darkest" type="number" name="total" id="total" onChange={handleInputChange} value={inputs.total} required></input>
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="last_name">Expense Type</label>
            <select class="border py-2 px-3 text-grey-darkest" name="transactionType" id="transactionType" onChange={handleInputChange} value={inputs.transactionType} required>
              <option value="">Please Select Category</option>
              <option value="Income">Income</option>
              <option value="Expenses">Expenses</option>
            </select>
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="category">Category</label>
            <input class="border py-2 px-3 text-grey-darkest" type="text" name="category" id="category" onChange={handleInputChange} value={inputs.category}></input>
          </div>
          <div class="flex flex-col mb-6">
            <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="memo">Memo</label>
            <input class="border py-2 px-3 text-grey-darkest" type="text" name="memo" id="memo" onChange={handleInputChange} value={inputs.memo}></input>
          </div>
          <div class="flex flex-col mb-6">
              <label class="mb-2 uppercase font-bold text-lg text-grey-darkest" for="date">Date</label>
              <input class="border py-2 px-3 text-grey-darkest" type="date" name="date" id="date" onChange={handleInputChange} required></input>
          </div>
          <div class="rounded bg-orange-300 p-4 flex items-center justify-center text-white">
            <button className="focus:outline-none" onClick={addDailyRecord}>Add Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecord;
