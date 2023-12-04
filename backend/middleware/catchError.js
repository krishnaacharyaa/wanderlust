export const catchError = (passedFunction)=> async (req, res, next)=>{
    Promise.resolve(passedFunction(req, res, next)).catch(next);
 }