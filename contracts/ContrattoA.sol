pragma solidity ^0.6.0;

contract ContrattoA {
  
  string public name = "Contract A, register users to events";
  address owner;
 
  address payable public contrattob;

  
  struct Event{
    uint _id;
    string _nameEvent;
    uint _amount;
    uint _timeSecondCheckIn;
    uint balance;
  }
  
  struct User{
      bool _isregistered;
  }
  
  uint public eventCount = 0;
  mapping (uint => Event) public events;
 
  //  l'utente si può registrare a più eventi. Ricerca tramite idEvento e indirizzo utente
  mapping (address => mapping(uint => User)) public users;
  
  // evento per il trasferimento degli ether al contrattob
  event transferToB(
    address indexed _from,
    address indexed _to,
    uint _id,
    uint _amount
  );
  
  //inizializzo il propritario del contratto
 constructor()public{
     owner=msg.sender;
     eventCount ++;
     events[eventCount]=Event(eventCount, "pippo", 2, now+200, 0);
 }
 
 function sentAddr(address  payable _addrContrattoB) public{
        contrattob = _addrContrattoB;
    }
 // con questo modificatore di funzione solo il proprietario può chiamare una funzione
 modifier onlyOwner(){
     require(msg.sender== owner);
     _;
 }
  // solo il proprietario del contratto può creare l'evento
 
 function createEvent(string memory _nameEvent, uint _amount ,uint _timeSecondCheckIn)public onlyOwner {
    eventCount ++;
    events[eventCount]=Event(eventCount, "pippo", 2, now+200, 0);
  }
  
   
  
    // verifica che l'indirizzo dell'utente non sia registrato in caso affermativo lo registra e invia gli ether al contratto B
    bool public test1=false;
    bool public test2=false;
    uint public valore;
    address public mittente;
    // verifica che la quantità di ether inviata è corretta 
  function checkAmount(uint _idEvent)internal {
     require(msg.value == events[_idEvent]._amount);
  }
  
   
   function register(uint _idEvent)public payable {
      valore=msg.value;
      mittente=msg.sender;
      
     //checkAmount(_idEvent);
      require(msg.value == events[_idEvent]._amount); // verifica che la quantità di ether inviata è corretta 
      test1=true;
      require(!users[msg.sender][_idEvent]._isregistered); // verifica se l'utente è registrato
      test2=true;
      users[msg.sender][_idEvent]._isregistered=true;
     
      events[_idEvent].balance += msg.value; // salva gli ether inviati di quell'evento per ricostruire il bilancio
      contrattob.transfer(valore);
      //emit transferToB(msg.sender, contrattob, eventCount, msg.value); // emetto l'evento del trasferimento di ether al contratto
   }
   
   
   
  
   function isRegistered(address sender, uint _idEvent)external view {
      
       require(users[sender][_idEvent]._isregistered );
   }
   
   function getTimeCheckIn(uint _idEvent) external view returns(uint){
       return events[_idEvent]._timeSecondCheckIn;
   }
    function getAmount(uint _idEvent)external view returns(uint){
        return events[_idEvent]._amount;
    }
    
    function getBalance(uint _idEvent)external view returns(uint){
        return events[_idEvent].balance;
    }
    
    function setBalance(uint _idEvent, uint _amount, address _user)external{
        events[_idEvent].balance -= _amount;
        users[_user][_idEvent]._isregistered=false;
    }
    
   // fallback() external payable{}
    receive ()external payable{}
}
