// reusable functions

function paramsId(req) {
  const { id } = req.params;
  return id
} 

function IDnotInDatabase(id, users) {

    const isIdinDatabase = users.filter(user => user.id == id)
  
    if (isIdinDatabase.length > 0) {
        return 1;
    } else {
        return 0
    }
}
module.exports = {
    IDnotInDatabase,
    paramsId
}