pragma solidity ^0.6.0;
import "./ContrattoA.sol";

contract ContrattoB {
  address payable owner;
  address payable addrB = address(this);
  mapping(address=> uint) public user;
  ContrattoA public contrattoa;

  constructor(ContrattoA _contrattoa)public{
    owner = msg.sender;
    contrattoa = _contrattoa;
    contrattoa.setAddr(addrB); // invia l'indirizzo del contrattoB al contrattoA
  } 
    
  modifier onlyOwner{
    require(owner==msg.sender);      
    _;
  }
     
   event transferAmount(
    address indexed _from,
    address indexed _to,
    uint _idEvent,
    uint _amount
   );

  //verifica se l'indirizzo dell'utente che sta eseguengo il check-in  è registrato nel contratto A in caso affermativo restituisce gli ether
  function checkIn( uint _idEvent) external payable {   
    contrattoa.isRegistered(msg.sender,_idEvent);     // verifio se l'indirizzo dell'utente è registrato nel contratto A
    uint timeCheckIn= contrattoa.getTimeCheckIn(_idEvent);     
    uint amount =contrattoa.getAmount(_idEvent);
    require(timeCheckIn >= now); //verifico se il tempo per il checkIn è scaduto
    msg.sender.transfer(amount); //affermativo trasferisce all'utente gli ether precedentemente inviati
    contrattoa.setBalance(_idEvent,amount,msg.sender); // aggiorna il bilancio dell'evento 
    emit transferAmount(address(this), msg.sender, _idEvent,amount);  
  }

  /*alla scadenza del tempo max per effettuare il check-in, solo il proprietario 
  può chiamare questa funzione trasferire il bilancio dell'evento nel suo wallet */
  function transferBalance(uint _idEvent) external payable onlyOwner{
    uint timeCheckIn= contrattoa.getTimeCheckIn(_idEvent);
    uint balance=contrattoa.getBalance(_idEvent);
    require(timeCheckIn < now);
    owner.transfer(balance);
  }
  
  receive () external payable{}  
}

