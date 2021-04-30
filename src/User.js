import { Age } from "./age";
import { Name } from "./name";
import { Surname } from "./surname";

export default function User(props){
 console.log('props', props)
 return(

     <h3>My name is <Name name={props.name}/> <Surname surname={props.surname  || "surname"}/>
     , I am <Age age={props.age}/>
      </h3>
 );
}