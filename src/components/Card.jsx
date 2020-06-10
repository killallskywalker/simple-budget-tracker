import React from 'react';

const Card = (props) => {    
        return(
        <div>
            <div className="text-white text-left px-4">{props.title}</div>
            <div class="text-white text-3xl  text-left px-4">{props.value}</div>
            <div class="text-gray-700 text-left px-4">
                <button class="bg-gray-100 bg-opacity-25 text-white text-base sm:text-xs font-bold rounded-full px-2 focus:outline-none">
                {props.detail}
                </button>
            </div>
        </div>
    )
}

export default Card;
