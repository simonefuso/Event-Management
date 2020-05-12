pragma solidity ^0.6.0;

contract ContrattoA {
  string public name = "Contract A, register users to events";
  address owner;
 
  address payable public contrattob;

  // struttura dell'evento 
  struct Event{
    uint _id;
    string _nameEvent;
    uint _amount;
    uint _timeSecondCheckIn;
    uint balance; // bilancio degli utenti registrati all'evento
  }
  
  struct User{
    bool _isregistered;
  }
  
  uint public eventCount = 0;
  mapping (uint => Event) public events;
 
  // l'utente si può registrare a più eventi. Ricerca tramite l'indirizzo utente e idEvento
  mapping (address => mapping(uint => User)) public users;
  
  // evento per il trasferimento degli ether al contrattob
  event transferToB(
    address indexed _from,
    address indexed _to,
    uint _id,
    uint _amount
  );
  
  constructor()public{
    owner=msg.sender; //inizializza il propritario del contratto
  }
 
  // imposta l'indirizzo del contatto B
  function setAddr(address  payable _addrContrattoB) public{
    contrattob = _addrContrattoB;
  }
 
  // con questo modificatore di funzione solo il proprietario può chiamare una funzione
  modifier onlyOwner(){
    require(msg.sender== owner);
    _;
  }

  // il proprietario del contratto è l'unico che può creare l'evento
  function createEvent(string memory _nameEvent, uint _amount ,uint _timeSecondCheckIn)public onlyOwner {
    eventCount ++;
    events[eventCount]=Event(eventCount, _nameEvent, _amount, now + _timeSecondCheckIn, 0);
  }

   
  // verifica che la quantità di ether inviata è corretta 
  function checkAmount(uint _idEvent)internal {
    require(msg.value == events[_idEvent]._amount);
  }
  
  // verifica che l'indirizzo dell'utente non sia registrato in caso affermativo lo registra e invia gli ether al contratto B
  function register(uint _idEvent)public payable {
    checkAmount(_idEvent);
    require(!users[msg.sender][_idEvent]._isregistered); //verifica che l'utente non sia registrato
    users[msg.sender][_idEvent]._isregistered=true;
    events[_idEvent].balance += msg.value; // aggiorna il bilancio
    contrattob.transfer(msg.value); // trasferisce gli ether ricevuti al contrattoB
    emit transferToB(msg.sender, contrattob, eventCount, msg.value); // emette l'evento del trasferimento di ether al contratto
  }
  
  //verifica se l'utente è registrato
  function isRegistered(address sender, uint _idEvent)external view {
    require(users[sender][_idEvent]._isregistered );
  }
   
  //ritorna il tempo del check-in in secondi dell'evento
  function getTimeCheckIn(uint _idEvent) external view returns(uint){
    return events[_idEvent]._timeSecondCheckIn;
  }
  
  //ritorna la quantità di ether richiesta per l'evento
  function getAmount(uint _idEvent)external view returns(uint){
    return events[_idEvent]._amount;
  }

  // ritorna il bilancio dell'evento
  function getBalance(uint _idEvent)external view returns(uint){
    return events[_idEvent].balance;
  }
    
  // imposta il bilancio dell'evento quando l'utente effettua il check-in
  function setBalance(uint _idEvent, uint _amount, address _user)external{
    events[_idEvent].balance -= _amount;
    users[_user][_idEvent]._isregistered=false;
  }
  
  // con la versione 0.6, è la fallback per semplici trasferimenti di ether  
  receive ()external payable{}
}
