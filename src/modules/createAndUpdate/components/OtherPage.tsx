import React from 'react'

interface Props {

}

const OtherPage = (props: Props) => {

    
    return (
        <div className='OtherPage  bg-white p-3 rounded-xl '>
            <div className="header flex justify-between">
                <h5 className='text-xl font-medium'>Others</h5>
                <div>Required (<span className='text-red-500 text-xl'>*</span>) </div>
            </div>

            <hr className='my-2' />

            <div className="body">
                <div>
                    <label>
                        Grade
                    </label>
                </div>
            </div>
        </div>
    )
}


export default OtherPage