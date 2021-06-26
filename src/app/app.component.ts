import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InjectableRxStompConfig, RxStompService } from '@stomp/ng2-stompjs';

import { myRxStompConfig } from './my-rx-stomp.config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'stringapp';

  
  New : string ;
  urlBroker : string ;
  userName  : string ;
  passcode : string ;
  topic : string ;
  brokerURL : string ;
  reverseString : string ;
  payload : any ;

  onSignUsers(form: NgForm)  {
    const Newname= form.value.name;
   
    
     this.payload =  {
       value : this.reverse(Newname)
     }   
     this.rxStompService.publish( {destination: this.topic, body: JSON.stringify(this.payload) } )
     console.log(this.payload);


  }

  reverse(str:string) {
    this.reverseString = str.split('').reverse().join('');
    return  this.reverseString;
  }



  constructor   ( public rxStompService: RxStompService )   {
      

    this.urlBroker = myRxStompConfig.brokerURL
    this.userName = myRxStompConfig.connectHeaders.login
    this.passcode = myRxStompConfig.connectHeaders.passcode 
    this.topic =   "something"
    this.payload = "";
    
    this.rxStompService.deactivate()
    
    this.rxStompService.configure ({
      brokerURL : this.urlBroker ,
      connectHeaders: {
        login: this.userName,
        passcode: this.passcode
      },
      heartbeatIncoming: 0,
      heartbeatOutgoing: 20000,
      reconnectDelay: 5000,
     })
     this.rxStompService.activate();

   
  }
 

  ngOnInit () {


    
  }

}
