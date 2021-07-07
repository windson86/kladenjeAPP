

export function IsAdmin (state ={admin:false} , action ){
            switch(action.type){
                case "TOKEN_PROVJERA" : return{
                    admin:true
                };

                default:
                    return state 
            }

}