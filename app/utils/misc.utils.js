const getFullName = (firstName, lastName, middleName) => (lastName + ' ' + middleName + ' ' + firstName)
const getIdAndFullName = user => {
  const {_id, firstName, lastName, middleName} = user
  return (
    {
      'id': _id,
      'fullName': getFullName(firstName, lastName, middleName),
    }
  )
}
exports.getFullName = getFullName
exports.getIdAndFullName = getIdAndFullName