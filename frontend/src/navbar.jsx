import { useState } from 'react'
import './index.css'
function Navbar(){
    return (<div className='flex justify-evenly p-2 bg-zinc-400'>
        <a href='#'>Services</a>
        <a href='/villageRedirect'>Recommendation</a>
        <a href='#'>Resources</a>
        <a href='#'>Incidents</a>
        <a href='#'>Reports</a>
        <a href='/login'>Login</a>
        <a href='/register'>Register</a>
    </div>);
}
export default Navbar;