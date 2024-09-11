import { useState, useEffect } from 'react'
import { getAllDJs } from '../utils/userUtils'
import { useNavigate } from 'react-router-dom'

const DJList = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(data?.length === 0) {
            getAllDJs().then(d => {
                if(d === 1) {
                    navigate("/login")
                }
                setData(d)
            })
        }
    })
    return (<>
    <div className="grid grid-cols-2 space-x-10 px-0 font-mono pb-20">
        <div className='px-10 font-bold'>
            DJ
        </div>
        <div className='font-bold'>
            Credits
        </div>
        {data.map(item => {
            console.log(item)
            return <>
            <div>
                {item.firstName + " " + item.lastName}
                </div>
                <div>
                {item.credits}
                </div>
            </>
        })}
    </div>
    </>)
}

export default DJList