let contract = new Contractor('MC_HCM_NESTLE')
exports.generateContractNumber = function(req, res) {
  const {supervisor} = req.body;
  // res.status(500).send({message: "Some error occurred while generate a number."});
  res.send(contract.generateNumber())
};

function Contractor(prefix){
  let _number = 0
  let _prefix = prefix
  return {
    generateNumber: function(){
      _number += 1
      return _prefix + '_' + _number
    }
  }
}
