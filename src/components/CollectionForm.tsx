import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from '../api/server'
import { useDispatch, useStore } from 'react-redux';
import { chooseTequila, chooseType, chooseAbv, chooseRegion } from "../redux/slices/RootSlice";

// interfaces

interface CollectionFormProps {
  id?: string[]
}

const CollectionForm = (props:CollectionFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.tequila } ${ props.id }`)
      setTimeout(() => {window.location.reload()}, 1000);
      event.target.reset()
    } else {
      // Use dispatch to update our state in our store
      dispatch(chooseTequila(data.tequila_name));
      dispatch(chooseType(data.type));
      dispatch(chooseAbv(data.abv));
      dispatch(chooseRegion(data.region));

      server_calls.create(store.getState())
      setTimeout( () => {window.location.reload()}, 1000);
      
    }
    
  }

  return (


    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="tequila_name">Tequila Name</label>
          <Input {...register('tequila_name')} name='tequila_name' placeholder="Tequila"/>
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <Input {...register('type')} name='type' placeholder="Type"/>
        </div>
        <div>
          <label htmlFor="abv">ABV</label>
          <Input {...register('abv')} name='abv' placeholder="Abv"/>
        </div>
        <div>
          <label htmlFor="region">Region</label>
          <Input {...register('region')} name='region' placeholder="Region"/>
        </div>
        <div className="flex p-1">
          <Button
            className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
            >
              Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CollectionForm