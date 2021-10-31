pragma solidity ^0.8.0;

contract SupplierContract{
    
    string public Single_text_box;
    uint256 public Single_number_box;
    
    struct init_details{
        string text_box;
        uint256 Num_box;
    }
    
    struct filesdetails{
        address Owner;
        uint num;
        string ipfshashedstring;
    }
    
    event Upholdfile_events(
        address _n,
        uint _x,
        string _file
    );
        
    
    filesdetails[] public filesdetails_array;

    mapping(address => mapping(uint => string)) public SupplierFilesCount;

    mapping (uint256 => init_details) public detailsbynumber;
    
    init_details[] public details_array;
    
    function setmessage(string memory _Single_text_box)public{
        Single_text_box = _Single_text_box;
    }
    
    function setnumber(uint256 _Single_number_box)public{
        Single_number_box = _Single_number_box;
    }
    
    function setdetails(uint x,string memory _text_box,uint256 _Num_box)public returns(uint messageid){
        messageid = x;
        detailsbynumber[messageid] = init_details(_text_box,_Num_box);
        details_array.push(init_details(_text_box,_Num_box));
    }
    
    function getdetails()public view returns(init_details[] memory){
        return details_array;
    }
    

    function setaddresswithIPFSfile(address _n,uint _x, string memory _file) external {
        SupplierFilesCount[_n][_x] = _file;
        filesdetails_array.push(filesdetails(_n,_x,_file));
        emit Upholdfile_events(_n,_x,_file);
    }
    
    // function getfilesdetails_array()public view returns (filesdetails[] memory){
    // //   for(uint i= 0; i < filesdetails_array.length; i++){
    // //       return filesdetails[i];
    //       return filesdetails_array;
    // // }
    // }
    
    function getfilesdetails_array()public view returns (address[] memory, uint[] memory,string[] memory){
       address[] memory Owner = new address[](filesdetails_array.length);
       uint[] memory num = new uint[](filesdetails_array.length);
       string[] memory ipfshashedstring = new string[](filesdetails_array.length);
       
       for(uint i= 0; i < filesdetails_array.length; i++){
           Owner[i] = filesdetails_array[i].Owner;
           num[i] = filesdetails_array[i].num;
           ipfshashedstring[i] = filesdetails_array[i].ipfshashedstring;
       }   
           return (Owner,num,ipfshashedstring);
          
       
    }

    
}