pragma solidity ^0.6.0;
import "./5_ContrattoA.sol";

contract ContrattoB {
    
    // indirizzo proprietario utente
    address payable owner;
    address payable addrB = address(this);
    mapping(address=> uint) public user;
    
    ContrattoA public contrattoa;
    
    constructor(ContrattoA _contrattoa)public{
        owner = msg.sender;
        contrattoa = _contrattoa;
        contrattoa.sentAddr(addrB);
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
 bool public test=false;
 bool public test1=false;
 
    function checkIn( uint _idEvent) public payable {
       
        // verifio se l'indirizzo dell'utente è registrato nel contratto A
        contrattoa.isRegistered(msg.sender,_idEvent);
        test=true;
        //verifico se il tempo per il checkIn è scaduto
        uint timeCheckIn= contrattoa.getTimeCheckIn(_idEvent);
        uint amount =contrattoa.getAmount(_idEvent);
        require(timeCheckIn >= now);
        test1=true;
        //affermativo invio ether all'utente
        msg.sender.transfer(amount);
        contrattoa.setBalance(_idEvent,amount,msg.sender);
        emit transferAmount(address(this), msg.sender, _idEvent,amount);
        
      
    }
 //  alla scadenza del tempo max trasferisce al proprietario del contratto gli ether non restituiti 
    function transferBalance(uint _idEvent) public payable onlyOwner{
        uint timeCheckIn= contrattoa.getTimeCheckIn(_idEvent);
        uint balance=contrattoa.getBalance(_idEvent);
        require(timeCheckIn < now);
        owner.transfer(balance);
    }
    fallback() external payable{}
   // receive () external payable{user[msg.sender]=msg.value;}
    
}
