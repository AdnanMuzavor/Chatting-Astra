//Helper to help in decidin g in displaying avatar
//Helps us to know if it's same user

export const isSameSender = (messages, m, i, userid) => {
  return (
    //If i is valid
    i <= messages.length - 1 &&
    //It's last message sent by user
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    //It's send by other user
    messages[i].sender._id !== userid
  );
};

export const isLastMessage=(messages,i,userid)=>{
    return(
        //If i is valid
        i<=messages.length-1 &&
        //Last message is sent by other user
        messages[messages.length-1].sender._id!==userid &&
        //And message does exitss
        messages[messages.length-1].sender._id!==undefined
    )
}
