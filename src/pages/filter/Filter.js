import React , {useState} from 'react';
import ListDetail from '../../components/ListDetail';
import useFillForm from '../../hooks/FormHooks';
import { useAlert } from 'react-alert'
import { types } from 'react-alert'

const Filter = () => {

    const alert = useAlert()

    const {inputs, handleInputChange, handleSubmit} = useFillForm();

    const [list, setList] = useState()

    const searchRecord = async() => {
        try{
            const response = await  fetch(`${process.env.REACT_APP_ENDPOINT}api/transaction-record/search-records`,{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json; charset=UTF-8'
                },
                body: JSON.stringify(inputs)
            })

            const data = await response.json()
            console.log(data)
            if(response.status === 200){
                console.log();
                alert.show(data.message , {type:types.SUCCESS})
                setList(data.data);
            }
            else if(response.status === 404){
                alert.show(data.message , {type:types.ERROR})
                setList(data.data);
            }

        }catch {
            alert.show('Unexpected error happens!' , {type:types.ERROR})
        }
        
    }
    
    return (
        <div className="mb-100 bg-white-500 h-screen leading-normal px-2 pt-2">
        <div className="grid grid-cols-3 gap-4 mx-2">
            <div>
                <a href="/dashboard" className="text-left">Back</a><span></span>
            </div>
        </div>    
        <div class="flex flex-col rounded-lg p-6 m-2 bg-green-500 shadow-2xl">
        <form class="mb-4" onSubmit={handleSubmit}>
            <div class="flex flex-col mb-2">
                <label class="mb-1 uppercase font-bold text-lg text-white" for="startDate">Date</label>
                <input class="border py-2 px-3 text-grey-darkest" type="date" name="startDate" id="startDate" onChange={handleInputChange} required></input>
            </div>
            <div class="flex flex-col mb-2">
                <label class="mb-1 uppercase font-bold text-lg text-white" for="date">Date</label>
                <input class="border py-2 px-3 text-grey-darkest" type="date" name="endDate" id="endDate" onChange={handleInputChange} required></input>
            </div>
            <div class="rounded bg-orange-300 p-4 flex items-center justify-center text-white mb-2">
                    <button className="focus:outline-none" onClick={searchRecord}>Search</button>
            </div>
            </form>
        </div>
        <ListDetail data={list}/>
        </div>
    );
}

export default Filter;
