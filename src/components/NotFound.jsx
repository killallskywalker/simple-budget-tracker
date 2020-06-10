import React from 'react';

const NotFound = (props) => {    
    if(props.data){
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
    } else {
        return(
            <div>
                <div className="m-10">
                    <div className="w-full h-12 my-8">
                        <p className="text-gray-400 text-center">Not Found</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;
