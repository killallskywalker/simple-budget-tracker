import React from 'react';
import moment from 'moment';

const List = (props) => {   
    console.log(props)
    if(props.data){
        return(
        <div>
            {props.data.map((item,key) => (
                <div className="rounded bg-white mx-2 mt-6 border-black shadow-xs mb-2">
                    <div className="grid grid-cols-2 py-2 mx-2 ">
                        <div className="text-left">{moment(item.month).format('MMMM YYYY')}</div>
                        <div className="flex">
                            <div className="flex-grow  text-right text-green-900">
                                ${props.totalIncome}
                            </div>
                            <div className="flex-grow text-right text-red-900">
                                ${props.totalExpenses}
                            </div>
                        </div>
                    </div>
                    <hr className="border-0 bg-gray-500 text-gray-500 h-px"></hr>
                    {item.transaction.map((item,key) => (
                    <div className="flex py-2 mx-2">
                        <div className="flex-grow  text-left text-green-900">
                        <span>{moment(item.date).format('DD-MM-YY')}</span><span> {item.category == null ? 'No Category' : item.category} - </span><a href={`/edit-record/${item._id}`}> {item.memo == null ? 'Default' : item.memo}</a>
                        </div>
                        <div className={"flex-grow text-right " + (item.transactionType === 'Income'? "text-green-900":"text-red-900")}>
                            ${item.total}
                        </div>
                    </div>      
                ))}
                </div> 
                ))}
            </div>
        )
    } else {
        return(
            <div>
                <div className="m-10">
                    <div className="w-full h-12 my-8">
                        <p className="text-gray-400 text-center">No Transaction</p>
                        <p className="text-gray-400 text-center">Tap + to add one</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;
