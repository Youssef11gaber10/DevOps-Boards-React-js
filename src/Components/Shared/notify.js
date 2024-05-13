import {toast} from 'react-toastify'
export let notify=(message,type,pos)=>
{
  toast[type](message,{position:pos,theme:'colored'})
}

