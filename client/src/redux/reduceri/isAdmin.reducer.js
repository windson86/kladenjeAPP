export function IsAdmin (state ={admin:false} , action ){
            switch(action.type){
                case "TOKEN_POKUŠAJ" : return{
                    token:action.token,
                    admin:false

                };
                case "TOKEN_PROVJERA" : return{
                    token:action.token,
                    admin:true
                };

                default:
                    return state 
            }

}